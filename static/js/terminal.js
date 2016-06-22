var running = false;

function runTerminal(commands, id) {
  running = true;
  $("#"+id+" > p").remove();
  for (var c in commands) {
    $("#"+id).append("<p>a bunch of hidden text for spacing</p>");
  }
  big.go(big.current);
  $("#"+id+" > p").remove();
  c = "";
  var input = false;
  var i = 0;
  var interval = setInterval(function () {
    if ((i < commands.length) && (!input)) {
      c = commands[i];
      if (c.type === 'input') {
        input = true;
        $("#"+id).append("<p id='current'>$</p>");
        var character = 0;
        var typing = setInterval(function () {
          if (character <= c.text.length) {
            $("#current").text("$ "+c.text.slice(0,character));
          } else {
            $("#current").attr("id","");
            input = false;
            clearInterval(typing);
          }
          character++;
        }, 50);
      } else {
        $("#"+id).append("<p class='output'>"+c.text+"</p>");
      }
      i++;
    } else if (i >= commands.length) {
      clearInterval(interval);
      running = false;
    }
  }, 1000);
}

$(window).on('keyup click', function(event) {
  if ($("#"+big.current+" > pre").hasClass("terminal") && (!running)) {
    if (typeof interval !== 'undefined') {
      clearInterval(interval);
    }
    if (typeof typing !== 'undefined') {
      clearInterval(typing);
    }
    id = $("#"+big.current+" > pre").attr("id");
    runTerminal(eval(id), id);
  }
});

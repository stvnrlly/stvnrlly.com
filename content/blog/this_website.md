---
title: "This website"
description: "Let's talk about how this website works"
date: "2016-06-15"
tags: []
categories: []
---
Let's talk about how this website works.

## Hugo

This site used to be regular hand-typed HTML with some Bootstrap, but when it
was time to add a bloggy thing it seemed like it would be a bad idea to try to
maintain that manually.

The most common tool for this seems to be Jekyll, but it seemed like a good
opportunity to try something new. So this website is built with Hugo. Here's
some of the stuff I learned:

Jekyll has a lot of dependencies, which makes it difficult to get a new
development environment set up. This is especially bad when "edit a website" is
supposed to be one of the easy entry-point contributions for newcomers. It
requires an explanation of gems, possibly a detour into version managers, and
might include some Python troubleshooting. Hugo only requires `brew install
hugo`.

Hugo and Jekyll have different opinions on how to build templates, which was
confusing at first. Jekyll uses the idea of one main template that is extended
by increasingly-specific templates. Hugo uses the idea of creating building
blocks and then putting them together into specific templates. This seems to
provide more flexibility in design, but the learning curve for template
name-spacing is not insubstantial.

Good example projects are invaluable. The Hugo documentation is comprehensive,
which means that your answer is in there but also means that you have to figure
out where to find it. Being able to flip back and forth between the docs and an
example or two helps a lot. And it's more useful if the examples are of specific
elements, rather than a showcase of all of the options.

## Vanilla.js

There are tons of open-source tools available, and—as much as we like to
complain about this or that drawback of them—they're pretty awesome. With a
little bit of Bootstrap, a website can look decent really quickly, and with
jQuery it can be interactive, too.

I've definitely taken advantage of that, but it comes at the cost of not fully
understanding the basic layer that those tools are abstracting. For many things,
this is fine: the time and consistency benefits are worth it. This site is a
good opportunity to experiment, though, so I'm trying to minimize dependencies
and force myself to work around them. That doesn't mean _no_ dependencies:
adding a blog would be very tedious without something like `hugo` behind the
scenes and I have some presentations that benefit from using big. But it is a
goal.

## Deployment

Jekyll also has the benefit of being the built-in language of GitHub Pages. You
can use another static site generator, but [you have to build locally and push
up the generated
site](https://help.github.com/articles/using-a-static-site-generator-other-than-jekyll/).
That's fine, but then you don't get to see the source, or you weirdly have two
repositories for the same site.

Luckily, I was already using [Mail-in-a-Box](https://mailinabox.email/) to host
the static version of the site. It's a really great way to host your own email
(much better than my previous setup of a computer in my basement), and it comes
with nice bonus features like static hosting and DNS.

The basic way to update the site would then be to build it locally and use
`sftp` to put it on the server. But that is reliant on me being on a computer
with the right server keys, which limits the speed of making changes. It also
creates parallel processes for posting to GitHub and posting to the site, which
could allow things to get out of sync.

One approach is to [set up a tiny
server](https://konklone.com/post/writing-in-public-syncing-with-github) that
listens for webhooks from GitHub and then rebuilds the site. I've gone a more
basic route, and just set up a `cron` job on the box to rebuild the site every
minute. Hugo is supposed to be fast, after all. The script is basically this:

```
git pull https://github.com/stvnrlly/stvnrlly.com.git
cd stvnrlly.com
hugo -d /home/user-data/www/stvnrlly.com
```

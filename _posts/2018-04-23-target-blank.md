---
layout: post
title: Target Blank
---

Something I only recently came about was the [vulnerability implications](https://mathiasbynens.github.io/rel-noopener/) of `target="_blank"` links.

Pages opened this way have an access to the previous window context and are able to potentially inject malicious code.

The solution is simple, just add `rel="noopener noreferrer"` to those links and you should be good to go.

<p class="Message Message--Warning">
  It might be worth asking if links should <a href="https://www.smashingmagazine.com/2008/07/should-links-open-in-new-windows/">open in a new window</a> at all.
</p>

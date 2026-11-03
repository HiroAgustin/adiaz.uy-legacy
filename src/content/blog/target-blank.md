---
title: "Target Blank"
description: "Something I only recently came about was the vulnerability implications of target=\"_blank\" links."
pubDate: "2018-04-23T00:00:00+00:00"
---

Something I only recently came about was the
[vulnerability implications](https://mathiasbynens.github.io/rel-noopener/) of `target="_blank"`
links.

Pages opened this way have an access to the previous window context and are able to potentially
inject malicious code.

The solution is simple, just add `rel="noopener noreferrer"` to those links and you should be good
to go.

<aside class="Message Message--Warning">

It might be worth asking if links should
[open in a new window](https://www.smashingmagazine.com/2008/07/should-links-open-in-new-windows/)
at all.

</aside>

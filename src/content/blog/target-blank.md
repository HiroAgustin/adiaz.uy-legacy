---
title: "Target Blank"
description: "Something I only recently came about was the vulnerability implications of target=\"_blank\" links."
pubDate: "2018-04-23T00:00:00+00:00"
dateDisplay: "23 April 2018"
previous: "/social-sharing/"
next: "/block-level-links/"
---
<p>Something I only recently came about was the <a href="https://mathiasbynens.github.io/rel-noopener/">vulnerability implications</a> of <code>target="_blank"</code> links.</p>

            <p>Pages opened this way have an access to the previous window context and are able to potentially inject malicious code.</p>

            <p>The solution is simple, just add <code>rel="noopener noreferrer"</code> to those links and you should be good to go.</p>

            <p class="Message Message--Warning">
              It might be worth asking if links should <a href="https://www.smashingmagazine.com/2008/07/should-links-open-in-new-windows/">open in a new window</a> at all.
            </p>

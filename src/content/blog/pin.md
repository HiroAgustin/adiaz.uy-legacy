---
title: "Pin"
description: "You can easily pin a list item to the top of the list using flexbox…"
pubDate: "2018-03-06T00:00:00+00:00"
dateDisplay: "06 March 2018"
previous: "/chips/"
next: "/take-home-assignments/"
---
<p>You can easily pin a list item to the top of the list using flexbox…</p>

            <pre><code class="language-html">&lt;ul class="List"&gt;
  &lt;li class="List__Item"&gt;First&lt;/li&gt;
  &lt;li class="List__Item"&gt;Second&lt;/li&gt;
  &lt;li class="List__Item List__Item--Pinned"&gt;Pinned&lt;/li&gt;
  &lt;li class="List__Item"&gt;Last&lt;/li&gt;
&lt;/ul&gt;
</code></pre>

            <p>…by setting the order of the pinned item to <code>-1</code>.</p>

            <pre><code class="language-css">.List {
  display: flex;
  flex-direction: column;
}

.List__Item--Pinned {
  order: -1;
}
</code></pre>

            <p class="Message Message--Warning">
              Beware of the accessibility implications this entails. The order will only change visually, not when navigating through keyboard.
            </p>

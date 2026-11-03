---
title: "Pin"
description: "You can easily pin a list item to the top of the list using flexbox…"
pubDate: "2018-03-06T00:00:00+00:00"
---

You can easily pin a list item to the top of the list using flexbox…

```html
<ul class="List">
  <li class="List__Item">First</li>
  <li class="List__Item">Second</li>
  <li class="List__Item List__Item--Pinned">Pinned</li>
  <li class="List__Item">Last</li>
</ul>
```

…by setting the order of the pinned item to `-1`.

```css
.List {
  display: flex;
  flex-direction: column;
}

.List__Item--Pinned {
  order: -1;
}
```

<aside class="Message Message--Warning">

Beware of the accessibility implications this entails. The order will only change visually, not when
navigating through keyboard.

</aside>

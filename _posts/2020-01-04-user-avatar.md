---
layout: post
title: User Avatar
date: 2020-01-04 18:26 -0300
---
If your app has users, I bet they have avatars. Rounded avatars are pretty much a standard on any UI, so you might be inclined to code something like this:

<p class="flex">
  <img
    src="https://placekitten.com/200/200"
    alt="User avatar placeholder"
    class="round m-auto"
    style="height: 100px; width: 100px;">
</p>

```html
<img
  class="Avatar"
  src="https://placekitten.com/200/200"
  alt="User avatar"
>
```

```css
.Avatar {
  height: 100px;
  border-radius: 50%;
  width: 100px;
}
```

Done, right? Push that commit, merge it to master, deploy it to prod, and go grab that well earned chocolate chip cookie.

## What about non-square images?

Fuck.

<p class="flex">
  <img
    src="https://placekitten.com/g/150/200"
    alt="User avatar placeholder"
    class="round m-0"
    style="height: 100px; width: 100px;">
  <img
    src="https://placekitten.com/300/200"
    alt="User avatar placeholder"
    class="round m-0"
    style="height: 100px; width: 100px;">
</p>

You could add one of those modals where the user edits their own avatar and store a cropped version of the image; I much rather use some CSS magic:

```html
<picture class="Avatar">
  <img
    src="https://placekitten.com/200/200"
    alt="User avatar"
  >
</picture>
```

```css
.Avatar {
  border-radius: 50%;
  height: 100px;
  overflow: hidden;
  width: 100px;
}

.Avatar > img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}
```

<p class="flex">
  <picture class="round" style="height: 100px; overflow: hidden; width: 100px;">
    <img
      src="https://placekitten.com/200/200"
      alt="User avatar placeholder"
      class="m-0"
      style="height: 100%; object-fit: cover; width: 100%;">
  </picture>
  <picture class="round" style="height: 100px; overflow: hidden; width: 100px;">
    <img
      src="https://placekitten.com/g/150/200"
      alt="User avatar placeholder"
      class="m-0"
      style="height: 100%; object-fit: cover; width: 100%;">
  </picture>
  <picture class="round" style="height: 100px; overflow: hidden; width: 100px;">
    <img
      src="https://placekitten.com/300/200"
      alt="User avatar placeholder"
      class="m-0"
      style="height: 100%; object-fit: cover; width: 100%;">
  </picture>
</p>

Using `object-fit: cover` on the `img` element makes it fit nicely inside its container, and we use `overflow: hidden` literally to cut corners. All achieved without the use of annoying modals or pesky JS. Now go get that cookie.

**Bonus tip:** use CSS Variables to create modifiers for the different types and sizes of avatars you’ll need:

```css
.Avatar {
  --avatar-size: 100px;
  --avatar-radius: 50%;

  border-radius: var(--avatar-radius);
  height: var(--avatar-size);
  overflow: hidden;
  width: var(--avatar-size);
}

.Avatar--square { --avatar-radius: 8px; }
.Avatar--small { --avatar-size: 50px; }
.Avatar--large { --avatar-size: 150px; }
```

<p class="flex">
  <picture style="border-radius: 8px; height: 100px; overflow: hidden; width: 100px;">
    <img
      src="https://placekitten.com/200/200"
      alt="User avatar placeholder"
      class="m-0"
      style="height: 100%; object-fit: cover; width: 100%;">
  </picture>
  <picture class="round" style="height: 50px; overflow: hidden; width: 50px;">
    <img
      src="https://placekitten.com/g/150/200"
      alt="User avatar placeholder"
      class="m-0"
      style="height: 100%; object-fit: cover; width: 100%;">
  </picture>
  <picture class="round" style="height: 150px; overflow: hidden; width: 150px;">
    <img
      src="https://placekitten.com/300/200"
      alt="User avatar placeholder"
      class="m-0"
      style="height: 100%; object-fit: cover; width: 100%;">
  </picture>
</p>

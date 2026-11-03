---
title: "User Avatar"
description: "If your app has users, I bet they have avatars. Rounded avatars are pretty much a standard on any UI, so you might be inclined to code something like this:"
pubDate: "2020-01-04T21:26:00+00:00"
dateDisplay: "04 January 2020"
previous: "/webpack/"
---
<p>If your app has users, I bet they have avatars. Rounded avatars are pretty much a standard on any UI, so you might be inclined to code something like this:</p>

            <p class="flex">
              <img src="https://picsum.photos/seed/avatar/200/200" alt="User avatar placeholder" class="round m-auto" style="height: 100px; width: 100px;" />
            </p>

            <pre><code class="language-html">&lt;img
  class="Avatar"
  src="https://picsum.photos/seed/avatar/200/200"
  alt="User avatar"
&gt;
</code></pre>

            <pre><code class="language-css">.Avatar {
  height: 100px;
  border-radius: 50%;
  width: 100px;
}
</code></pre>

            <p>Done, right? Push that commit, merge it to master, deploy it to prod, and go grab that well earned chocolate chip cookie.</p>

            <h2 id="what-about-non-square-images">What about non-square images?</h2>

            <p>Fuck.</p>

            <p class="flex">
              <img src="https://picsum.photos/seed/avatar/150/200?grayscale" alt="User avatar placeholder" class="round m-0" style="height: 100px; width: 100px;" />
              <img src="https://picsum.photos/seed/avatar/300/200" alt="User avatar placeholder" class="round m-0" style="height: 100px; width: 100px;" />
            </p>

            <p>You could add one of those modals where the user edits their own avatar and store a cropped version of the image; I much rather use some CSS magic:</p>

            <pre><code class="language-html">&lt;picture class="Avatar"&gt;
  &lt;img
    src="https://picsum.photos/seed/avatar/200/200"
    alt="User avatar"
  &gt;
&lt;/picture&gt;
</code></pre>

            <pre><code class="language-css">.Avatar {
  border-radius: 50%;
  height: 100px;
  overflow: hidden;
  width: 100px;
}

.Avatar &gt; img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}
</code></pre>

            <p class="flex">
              <picture class="round" style="height: 100px; overflow: hidden; width: 100px;">
                <img src="https://picsum.photos/seed/avatar/200/200" alt="User avatar placeholder" class="m-0" style="height: 100%; object-fit: cover; width: 100%;" />
              </picture>
              <picture class="round" style="height: 100px; overflow: hidden; width: 100px;">
                <img src="https://picsum.photos/seed/avatar/150/200?grayscale" alt="User avatar placeholder" class="m-0" style="height: 100%; object-fit: cover; width: 100%;" />
              </picture>
              <picture class="round" style="height: 100px; overflow: hidden; width: 100px;">
                <img src="https://picsum.photos/seed/avatar/300/200" alt="User avatar placeholder" class="m-0" style="height: 100%; object-fit: cover; width: 100%;" />
              </picture>
            </p>

            <p>Using <code>object-fit: cover</code> on the <code>img</code> element makes it fit nicely inside its container, and we use <code>overflow: hidden</code> literally to cut corners. All achieved without the use of annoying modals or pesky JS. Now go get that cookie.</p>

            <p><strong>Bonus tip:</strong> use CSS Variables to create modifiers for the different types and sizes of avatars you’ll need:</p>

            <pre><code class="language-css">.Avatar {
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
</code></pre>

            <p class="flex">
              <picture style="border-radius: 8px; height: 100px; overflow: hidden; width: 100px;">
                <img src="https://picsum.photos/seed/avatar/200/200" alt="User avatar placeholder" class="m-0" style="height: 100%; object-fit: cover; width: 100%;" />
              </picture>
              <picture class="round" style="height: 50px; overflow: hidden; width: 50px;">
                <img src="https://picsum.photos/seed/avatar/150/200?grayscale" alt="User avatar placeholder" class="m-0" style="height: 100%; object-fit: cover; width: 100%;" />
              </picture>
              <picture class="round" style="height: 150px; overflow: hidden; width: 150px;">
                <img src="https://picsum.photos/seed/avatar/300/200" alt="User avatar placeholder" class="m-0" style="height: 100%; object-fit: cover; width: 100%;" />
              </picture>
            </p>

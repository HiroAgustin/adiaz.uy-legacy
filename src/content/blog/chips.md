---
title: "Chips"
description: "’Twas an idle Sunday afternoon and I was looking for some images of Poker Chips to use on a brewing side project. After a quick search I couldn’t find any that quite fit my imaginary requirements, so as a way to procrastinate any actual work, I decided to make my own."
pubDate: "2018-02-26T00:00:00+00:00"
dateDisplay: "26 February 2018"
previous: "/hash/"
next: "/pin/"
---
<p>’Twas an idle Sunday afternoon and I was looking for some images of Poker Chips to use on a brewing side project. After a quick search I couldn’t find any that quite fit my imaginary requirements, so as a way to procrastinate any actual work, I decided to make my own.</p>

            <p>I found <a href="https://design.tutsplus.com/tutorials/how-to-create-a-stack-of-poker-chips--vector-2320/">this neat tutorial</a> and went over to <a href="https://svg-edit.github.io/svgedit/releases/svg-edit-2.8.1/svg-editor.html">SVG-Edit</a> figuring it would be pretty straight forward. After fumbling with the editor for an hour I remembered my fondness to <a href="https://codepen.io/HiroAgustin/pen/Atgic/?editors=0010#0">coding shapes</a>, the chip is just a circle with stripes after all.</p>

            <pre><code class="language-html">&lt;!-- Chip --&gt;
&lt;circle fill="white" stroke="black" cx="100" cy="100" r="89" /&gt;
&lt;!-- Large Stripe --&gt;
&lt;circle fill="none" stroke="navy" stroke-width="20" cx="100" cy="100" r="80" /&gt;
&lt;!-- Small Stripe --&gt;
&lt;circle fill="none" stroke="navy" stroke-width="5" cx="100" cy="100" r="60" /&gt;
</code></pre>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="d-block m-auto" width="100%" height="250px">
                <!-- Chip -->
                <circle fill="white" stroke="black" cx="100" cy="100" r="89" />
                <!-- Large Stripe -->
                <circle stroke="navy" stroke-width="20" cx="100" cy="100" r="80" fill="none" />
                <!-- Small Stripe -->
                <circle stroke="navy" stroke-width="5" cx="100" cy="100" r="60" fill="none" />
              </svg>
            </p>

            <p>We can then use the <code>stroke-dasharray</code> attribute on the stripes to match the chip pattern. We want 6 painted sections and 6 white ones on the large stripe and twice as many for the small one. Given the formula to calculate the circumference (2πr) we know each section on the large stripe should be of length 42 (2π × 80 ÷ 12) and 15.7 (2π × 60 ÷ 24) for the small one. To manually tweak the alignment of the dashes we can set the <code>stroke-dashoffset</code> value on each stripe.</p>

            <pre><code class="language-html">&lt;!-- Large Stripe --&gt;
&lt;circle fill="none" stroke="navy" stroke-width="20" stroke-dasharray="42" stroke-dashoffset="20" cx="100" cy="100" r="80" /&gt;
&lt;!-- Small Stripe --&gt;
&lt;circle fill="none" stroke="navy" stroke-width="5" stroke-dasharray="15.7" stroke-dashoffset="7" cx="100" cy="100" r="60" /&gt;
</code></pre>
            <p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="d-block m-auto" width="100%" height="250px">
                <!-- Chip -->
                <circle fill="white" stroke="black" cx="100" cy="100" r="89" />
                <!-- Large Stripe -->
                <circle fill="none" stroke="navy" stroke-width="20" stroke-dasharray="42" stroke-dashoffset="20" cx="100" cy="100" r="80" />
                <!-- Small Stripe -->
                <circle fill="none" stroke="navy" stroke-width="5" stroke-dasharray="15.7" stroke-dashoffset="7" cx="100" cy="100" r="60" />
              </svg>
            </p>

            <p>Finally, we want to be able to have multiple chips of different colors. To achieve it, we can leverage SVG’s <code>symbol</code> and <code>use</code> tags to allow for multiple copies of the same image without duplicating our code. Then using CSS variables we can set the body and stripe color for each chip.</p>

            <pre><code class="language-html">&lt;svg style="display: none;"&gt;
  &lt;symbol id="Chip" viewBox="0 0 200 200"&gt;
    &lt;!-- Chip --&gt;
    &lt;circle class="Chip__Body" cx="100" cy="100" r="89" /&gt;
    &lt;!-- Large Stripe --&gt;
    &lt;circle class="Chip__Strip" stroke-width="20" stroke-dasharray="42" stroke-dashoffset="20" cx="100" cy="100" r="80" /&gt;
    &lt;!-- Small Stripe --&gt;
    &lt;circle class="Chip__Strip" stroke-width="5" stroke-dasharray="15.7" stroke-dashoffset="7" cx="100" cy="100" r="60" /&gt;
  &lt;/symbol&gt;
&lt;/svg&gt;

&lt;svg class="Chip Chip--White"&gt;
  &lt;use xlink:href="#Chip" /&gt;
&lt;/svg&gt;
&lt;svg class="Chip Chip--Red"&gt;
  &lt;use xlink:href="#Chip" /&gt;
&lt;/svg&gt;
&lt;svg class="Chip Chip--Green"&gt;
  &lt;use xlink:href="#Chip" /&gt;
&lt;/svg&gt;
&lt;svg class="Chip Chip--Black"&gt;
  &lt;use xlink:href="#Chip" /&gt;
&lt;/svg&gt;
&lt;svg class="Chip Chip--Blue"&gt;
  &lt;use xlink:href="#Chip" /&gt;
&lt;/svg&gt;
</code></pre>

            <p>The reason why we need to use css variables is because of how <code>use</code> works. Basically we can’t just write <code>.Chip--White .Chip__Body</code> to set the color because that DOM structure doesn’t exist. But by setting the variables in the parent element the values are inherited.</p>

            <pre><code class="language-css">.Chip {
  --strip-color: white;

  &amp;__Body {
    fill: var(--chip-color);
    stroke: black;
  }

  &amp;__Strip {
    fill: none;
    stroke: var(--strip-color);
  }

  &amp;--White {
    --chip-color: white;
    --strip-color: navy;
  }

  &amp;--Red { --chip-color: red; }
  &amp;--Green { --chip-color: green; }
  &amp;--Black { --chip-color: black; }
  &amp;--Blue { --chip-color: blue; }
}
</code></pre>

            <p>Checkout the Pen <a href="https://codepen.io/HiroAgustin/pen/YeOEyb/">Chips</a> to see the end result.</p>

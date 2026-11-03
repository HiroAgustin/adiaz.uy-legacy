---
title: "Why I Hate Images"
description: "According to HTTP Archive today’s average web page size is 1.9MB. Almost 64% of that weight comes from images. As someone who is used to browsing the web on a cellphone through a 3G connection, that really sucks."
pubDate: "2014-12-16T00:00:00+00:00"
dateDisplay: "16 December 2014"
next: "/interview-trivia/"
---
<p>According to <a href="http://httparchive.org/interesting.php?a=All&amp;l=Dec%201%202014">HTTP Archive</a> today’s average web page size is 1.9MB. Almost 64% of that weight comes from images. As someone who is used to browsing the web on a cellphone through a 3G connection, that really sucks.</p>

            <p>Images are one of the main reasons why the web became popular. Could you picture today’s websites without them? How many wouldn’t even exist? It’s interesting to read the <a href="http://diveintohtml5.info/past.html#history-of-the-img-element">history of the img element</a> and see how the initial pitch became the standard we ended up using for the past twenty years.</p>

            <p>Images also helped push the boundaries of what was achievable with CSS: border radius, box shadow, custom fonts, gradient backgrounds. These effects were only possible using images and were translated into web standards thanks to their popularity (and then <a href="http://en.wikipedia.org/wiki/Flat_Design">Flat Design</a> became a thing).</p>

            <p>But when did image obesity started to become a problem?</p>

            <h2 id="the-fat-web">The Fat Web</h2>

            <p>When the iPhone 4 came out, Apple introduced the “Retina Display”. In theory, this meant beautifully rendered images however in practice, all of the images on the web started to look fuzzy. Retina displays basically double the amount of pixels on the screen, so images now require twice as many pixels to look sharp.</p>

            <p>Easy fix, right? Say you have a 30x60 image and you want it to look good on retina displays, just create it as a 60x120 and halve its size with some CSS magic. Do that for all the images on your site and you are done, home early for dinner. Oh, one more thing, all of your users are now complaining the site is slow, even the small ungrateful bunch that have retina displays.</p>

            <p>Having problems because of a shift in technology is one thing, creating them ourselves to follow design trends is just irresponsible. Features such as banner sliders, cover images and image galleries done poorly come with an expensive performance cost.</p>

            <h3 id="alternative-paths">Alternative Paths</h3>

            <p>Where traditionally images are used, any of the following approaches may be better suited:</p>

            <p>Data URIs allows us to embed images inline using Base64 encoding. This should only be applied to small images as the resulting amount of characters from the encoding may not worth it. You can use <a href="http://websemantics.co.uk/online_tools/image_to_data_uri_convertor/">this tool</a> to convert your images.</p>

            <p><strong>SVGs</strong> have been <a href="http://caniuse.com/#search=svg">widely supported</a> for a while now. It can reduce the image size considerably and, if embedded into the HTML is one less HTTP Request. SVGs come with other advantages, as they can be styled and <a href="http://davidwalsh.name/svg-animation">animated</a> using CSS/JS.</p>

            <p>UTF8 provides a set of symbols which, although limited, can be very useful as they can be styled as text with virtually no performance cost. You can find some of them at <a href="http://www.utf8icons.com/">utf8icons</a> or <a href="http://www.fileformat.info/info/unicode/block/miscellaneous_symbols/utf8test.htm">fileformat</a>.</p>

            <p>Icon fonts are an amazing example of developer creativity. As custom fonts were available on the web, someone decided to use a font of icons instead of text. <a href="http://fontawesome.io/">Font Awesome</a> is a free font with an outstanding set of icons which you can include in your website from their CDN.</p>

            <p>Yet, you might say: “All of this is nice, but in the <em>real world</em> I need to use images”…</p>

            <h3 id="if-you-must-then-do-it-right">If you must, then do it right</h3>

            <p>Google released their own image format called <a href="https://developers.google.com/speed/webp/">Webp</a> which is <a href="https://www.youtube.com/watch?v=rz5TGN7eUcM">apparently</a> much smaller. Although browser support comes down to Chrome and Opera, people are <a href="https://github.com/msemenistyi/connect-image-optimus">building tools</a> to automatically serve webp images when supported, with fallback to regular image formats.</p>

            <p>Progressive JPEGs are not news, yet they are still a good way to go. They don’t improve performance but the <a href="http://youtu.be/znjy4Kl3IfU">perception of speed</a>. Where is the magic? Instead of rendering top-to-bottom they render as a low quality version of the image and improve over time as data is downloaded.</p>

            <p>There are a few techniques to deal with the annoying retina displays: you can sniff for the user’s pixel density using <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries#resolution">media queries</a> and based on that load the most appropriate image, and a new HTML5 spec allows us to define a set of images using the <code>srcset</code> attribute. There is a great article on that at <a href="http://www.smashingmagazine.com/2014/05/14/responsive-images-done-right-guide-picture-srcset/">Smashing Magazine</a>.</p>

            <p>Even if you are using regular images there’s a lot you can do to improve your page size. Addy Osmani has a list of <a href="http://addyosmani.com/blog/image-optimization-tools/">tools for image optimization</a>. To that list I would add his own <a href="https://github.com/addyosmani/tmi">too many images</a> which helps developers figure out the weight of their pages.</p>

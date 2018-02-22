---
layout: post
title: Why I Hate Images
---

According to [HTTP Archive](http://httparchive.org/interesting.php?a=All&l=Dec%201%202014) today’s average web page size is 1.9MB. Almost 64% of that weight comes from images. As someone who is used to browsing the web on a cellphone through a 3G connection, that really sucks.

Images are one of the main reasons why the web became popular. Could you picture today’s websites without them? How many wouldn’t even exist? It’s interesting to read the [history of the img element](http://diveintohtml5.info/past.html#history-of-the-img-element) and see how the initial pitch became the standard we ended up using for the past twenty years.

Images also helped push the boundaries of what was achievable with CSS: border radius, box shadow, custom fonts, gradient backgrounds. These  effects were only possible using images and were translated into web standards thanks to their popularity (and then [Flat Design](http://en.wikipedia.org/wiki/Flat_Design) became a thing).

But when did image obesity started to become a problem?

## The Fat Web

When the iPhone 4 came out, Apple introduced the “Retina Display”. In theory, this meant beautifully rendered images however in practice, all of the images on the web started to look fuzzy. Retina displays basically double the amount of pixels on the screen, so images now require twice as many pixels to look sharp.

Easy fix, right? Say you have a 30x60 image and you want it to look good on retina displays, just create it as a 60x120 and halve its size with some CSS magic. Do that for all the images on your site and you are done, home early for dinner. Oh, one more thing, all of your users are now complaining the site is slow, even the small ungrateful bunch that have retina displays.

Having problems because of a shift in technology is one thing, creating them ourselves to follow design trends is just irresponsible. Features such as banner sliders, cover images and image galleries done poorly  come with an expensive performance cost.

### Alternative Paths

Where traditionally images are used, any of the following approaches may be better suited:

Data URIs allows us to embed images inline using Base64 encoding. This should only be applied to small images as the resulting amount of characters from the encoding may not worth it. You can use [this tool](http://websemantics.co.uk/online_tools/image_to_data_uri_convertor/) to convert your images.

**SVGs** have been [widely supported](http://caniuse.com/#search=svg) for a while now. It can reduce the image size considerably and, if embedded into the HTML is one less HTTP Request. SVGs come with other advantages, as they can be styled and [animated](http://davidwalsh.name/svg-animation) using CSS/JS.

UTF8 provides a set of symbols which, although limited, can be very useful as they can be styled as text with virtually no performance cost. You can find some of them [here](http://www.utf8icons.com/) and [here](http://www.fileformat.info/info/unicode/block/miscellaneous_symbols/utf8test.htm).

Icon fonts are an amazing example of developer creativity. As custom fonts were available on the web, someone decided to use a font of icons instead of text. [Font Awesome](http://fontawesome.io/) is a free font with an outstanding set of icons which you can include in your website from their CDN.

Yet, you might say: “All of this is nice, but in the *real world* I need to use images”…

### If you must, then do it right

Google released their own image format called [Webp](https://developers.google.com/speed/webp/) which is [apparently](https://www.youtube.com/watch?v=rz5TGN7eUcM) much smaller. Although browser support comes down to Chrome and Opera, people are [building tools](https://github.com/msemenistyi/connect-image-optimus) to automatically serve webp images when supported, with fallback to regular image formats.

Progressive JPEGs are not news, yet they are still a good way to go. They don’t improve performance but the [perception of speed](http://youtu.be/znjy4Kl3IfU). Where is the magic? Instead of rendering top-to-bottom they render as a low quality version of the image and improve over time as data is downloaded.

There are a few techniques to deal with the annoying retina displays: you can sniff for the user’s pixel density using [media queries](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries#resolution) and based on that load the most appropriate image, and a new HTML5 spec allows us to define a set of images using the `srcset` attribute. There is a great article on that at [Smashing Magazine](http://www.smashingmagazine.com/2014/05/14/responsive-images-done-right-guide-picture-srcset/).

Even if you are using regular images there’s a lot you can do to improve your page size. Addy Osmani has a list of [tools for image optimization](http://addyosmani.com/blog/image-optimization-tools/). To that list I would add his own [too many images](https://github.com/addyosmani/tmi) which helps developers figure out the weight of their pages.

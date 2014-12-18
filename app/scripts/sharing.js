;(function (win, doc, s, js, fjs, inc, ga)
{
  'use strict';

  fjs = doc.getElementsByTagName(s)[0];

  inc = function (src)
  {
    js = doc.createElement(s);
    js.src = src;
    js.async = 1;
    fjs.parentNode.insertBefore(js, fjs);
  };

  // <!-- Twitter Button -->
  inc('//platform.twitter.com/widgets.js');
  // <!-- End Twitter Button -->

  // <!-- Google Analytics -->
  inc('//www.google-analytics.com/analytics.js');

  win.GoogleAnalyticsObject = 'ga';

  ga = win.ga = function ()
  {
    (win.ga.q = win.ga.q || []).push(arguments);
  };

  ga.l = 1 * new Date();

  ga('create', 'UA-46154238-1', 'auto');
  ga('send', 'pageview');
  // <!-- End Google Analytics -->

}(window, document, 'script'));

---
title: "Interview Trivia"
description: "While interviewing for a new job I was asked a few JavaScript Trivia questions. Following are my answers."
pubDate: "2018-01-19T00:00:00+00:00"
dateDisplay: "19 January 2018"
previous: "/why-i-hate-images/"
next: "/uyrobot/"
---
<p>While interviewing for a new job I was asked a few JavaScript Trivia questions. Following are my answers.</p>

            <blockquote>
              <p>What is ES6?</p>
            </blockquote>

            <p>ES6 (aka EcmaScript 2015) is the 6th edition of the JavaScript language specification. EcmaScript was created as a way to standardize the implementation of JavaScript across browsers and reduce its incompatibilities. ES6 defines new functionality like arrow functions, let &amp; const variable constructs, template strings, classes, destructuring assignments and more.</p>

            <blockquote>
              <p>Where can JavaScript be run?</p>
            </blockquote>

            <p><a href="http://johnny-five.io/">Everywhere!</a> While originally bound to the client-side of web browsers, JS can now be run on anything that has support for a JavaScript engine (usually Chrome’s V8). Also thanks to the popularity of Node.js, is now pretty common to find JS running server-side.</p>

            <blockquote>
              <p>What is the difference between ‘currentTarget’ and ‘target’ when talking about events?</p>
            </blockquote>

            <p><code>event.currentTarget</code> identifies the DOM element to which the triggered event listener was attached to, whereas <code>event.target</code> references the element where the event originally occurred. Unless a different context is specifically bound to the handling function, <code>currentTarget</code> should match the <code>this</code> keyword in the handler.</p>

            <blockquote>
              <p>What is the benefit to using a library like React/Vue/Angular vs using plain old JavaScript?</p>
            </blockquote>

            <p>The goal of a JavaScript framework is to lay some groundwork and provide developers with building blocks that follow standardized software design patterns. This allows devs not only to get a head start on a project but to come up with (in theory) a more robust solution.</p>

            <p>As web development grew from building simple websites to complex web apps, so did the responsibility to build maintainable, scalable code. Libraries and frameworks help with just that. Choosing one the right one for your team and project is a <a href="http://www.commitstrip.com/en/2015/09/16/how-to-choose-the-right-javascript-framework/">different story</a>.</p>

            <blockquote>
              <p>Can you give an example of prototypal inheritance?</p>
            </blockquote>

            <p>Using the latest version of the spec, one can simply use the <code>extend</code> keyword to create a
              subclass and inherit the prototype of the parent class:</p>

            <pre><code class="language-js">class Vehicle {
  constructor(wheels) {
    this.wheels = wheels
  }
}

class Car extends Vehicle {
  constructor() {
    super(4)
  }
}
</code></pre>

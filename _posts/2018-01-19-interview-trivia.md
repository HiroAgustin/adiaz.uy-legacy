---
layout: post
title: Interview Trivia
---

While interviewing for a new job I was asked a few JavaScript Trivia questions. Following are my answers.

***

### What is ES6?

ES6 (aka EcmaScript 2015) is the 6th edition of the JavaScript language specification. EcmaScript was created as a way to standardize the implementation of JavaScript across browsers and reduce its incompatibilities. ES6 defines new functionality like arrow functions, let & const variable constructs, template strings, classes, destructuring assignments and more.

***

### Where can JavaScript be run?

[Everywhere!](http://johnny-five.io/) While originally bound to the client-side of web browsers, JS can now be run on anything that has support for a JavaScript engine (usually Chrome’s V8). Also thanks to the popularity of Node.js, is now pretty common to find JS running server-side.

***

### What is the difference between ‘currentTarget’ and ‘target’ when talking about events?

`event.currentTarget` identifies the DOM element to which the triggered event listener was attached to, whereas `event.target` references the element where the event originally occurred. Unless a different context is specifically bound to the handling function, `currentTarget` should match the `this` keyword in the handler.

***

### What is the benefit to using a library like React/Vue/Angular vs using plain old JavaScript?

The goal of a JavaScript framework is to lay some groundwork and provide developers with building blocks that follow standardized software design patterns. This allows devs not only to get a head start on a project but to come up with (in theory) a more robust solution.

As web development grew from building simple websites to complex web apps, so did the responsibility to build maintainable, scalable code. Libraries and frameworks help with just that. Choosing one the right one for your team and project is a [different story](http://www.commitstrip.com/en/2015/09/16/how-to-choose-the-right-javascript-framework/).

***

### Can you give an example of prototypal inheritance?

Using the latest version of the spec, one can simply use the `extend` keyword to create a
subclass and inherit the prototype of the parent class:

```js
class Vehicle {
  constructor(wheels) {
    this.wheels = wheels
  }
}

class Car extends Vehicle {
  constructor() {
    super(4)
  }
}
```

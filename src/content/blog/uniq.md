---
title: "uniq"
description: "Another question I’m frequently encountering is to implement a function that, given an array of integers, removes the duplicates. This can be achieved by storing the items as we filter the collection and leave out the ones that are already in our stash."
pubDate: "2018-02-13T00:00:00+00:00"
dateDisplay: "13 February 2018"
previous: "/flatten/"
next: "/hash/"
---
<p>Another question I’m frequently encountering is to implement a function that, given an array of integers, removes the duplicates. This can be achieved by storing the items as we filter the collection and leave out the ones that are already in our stash.</p>

            <pre><code class="language-js">function uniq (collection = []) {
  const stash = {}

  return collection.filter(item =&gt; {
    if (stash.hasOwnProperty(item))
      return false

    stash[item] = true

    return true
  })
}
</code></pre>

            <p>Once again underscore.js offers a more <a href="http://underscorejs.org/docs/underscore.html#section-60">roboust solution</a>.</p>

            <hr />

            <p>A slightly different problem that can be solved with almost the same code is: Given an array of integers, of which only a single one appears an odd amount of times, return that number.</p>

            <pre><code class="language-js">function findOdd (collection = []) {
  const stash = {}

  collection.forEach(item =&gt; {
    if (stash.hasOwnProperty(item))
      delete stash[item]
    else
      stash[item] = true
  })

  return Object.keys(stash)[0]
}
</code></pre>

            <p>Because we are assured just one item will show up without a matching pair, by deleting the prop each time a second occurrence appears, the single remaining key will be the value we were looking for.</p>

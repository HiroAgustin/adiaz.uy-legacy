---
title: "Flatten"
description: "Every other interview I’m asked to implement a flatten function that receives an array and returns a flattened version of it. They may request different ways to handle edge cases, but my usual answer is in the lines of…"
pubDate: "2018-02-09T00:00:00+00:00"
dateDisplay: "09 February 2018"
previous: "/uyrobot/"
next: "/uniq/"
---
<p>Every other interview I’m asked to implement a <code>flatten</code> function that receives an array and returns a flattened version of it. They may request different ways to handle edge cases, but my usual answer is in the lines of…</p>

            <pre><code class="language-js">function flatten (collection = []) {
  let result = []

  collection.forEach(item =&gt; {
    if (Array.isArray(item))
      result = result.concat(flatten(item))
    else
      result.push(item)
  })

  return result
}
</code></pre>

            <p>Are there better ways to do it? <a href="http://underscorejs.org/docs/underscore.html#section-56">Definitely</a>, but at an early interview stage this is usually good enough.</p>

            <p>I’m still glad this comes up more often than implementing <code>mergeSort</code>.</p>

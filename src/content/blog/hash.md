---
title: "Hash"
description: "Continuing the interview questions thread, a while back I was presented with a fun take-home assignment:"
pubDate: "2018-02-21T00:00:00+00:00"
dateDisplay: "21 February 2018"
previous: "/uniq/"
next: "/chips/"
---
<p>Continuing the interview questions thread, a while back I was presented with a fun take-home assignment:</p>

            <blockquote>
              <p>Write JavaScript code to find a 9 letter string of characters that contains only letters from: ‘acdegilmnoprstuw’ such that <code>hash(the_string)</code> is 956446786872726.</p>
            </blockquote>

            <pre><code class="language-js">function hash (alphabet, s) {
  let h = 7

  for (let i = 0; i &lt; s.length; i++)
    h = h * 37 + alphabet.indexOf(s[i])

  return h
}
</code></pre>

            <hr />

            <p>I needed to find a string that, given this hashing algorithm, would return a specific number. Therefore I had to build a <code>decrypt</code> method that would reverse the encryption so I could pass in the number and get the string.</p>

            <p>Looking at the algorithm you can see the interval between each letter is composed of the previous number multiplied by 37 plus the index of the letter in the alphabet.</p>

            <p>By decreasing <code>helper</code> until it was a multiple of 37 I was able to find that difference. Once I knew the index of the letter, I just prepended it to the resulting string.</p>

            <p>All that remained to do then was to divide <code>number</code> by 37 and repeat until I hit the initial value of 7. And of course, turn the array into a string.</p>

            <pre><code class="language-js">function decrypt(alphabet, number) {
  const result = []
  let helper = number

  while (number !== 7) {
    while (helper % 37 !== 0)
      helper--

    result.unshift(
      alphabet[number - helper]
    )

    number = helper /= 37
  }

  return result.join('')
}
</code></pre>

# adiaz.uy

My corner of the web.

## Local preview

This is a plain HTML and CSS site. No build step, Ruby, or Jekyll is required.
From the repository root, run:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/>. Post URLs use directories with an `index.html`
(for example, `/user-avatar/`). About and Archive remain at `/about/` and
`/archive/`; the custom error page is `/404.html`.

## Editing and publishing

Edit the HTML files directly and use `public/styles.css` for shared styles.
Post content also appears on `index.html` and in `atom.xml`; keep those copies,
the archive, previous/next links, and `sitemap.xml` in sync when changing posts.
Interactive examples retain their inline styles, and Prism still highlights code.

Publish this directory as-is on any static host. For GitHub Pages, publish from
the repository root; `.nojekyll` disables Jekyll processing. Keep `CNAME` for the
custom domain and configure other hosts to serve `404.html` for missing URLs.
The existing images, `Resume.pdf`, feed, sitemap, and manifest are included.

To check the static routes, links, metadata, and feed without dependencies:

```sh
python3 -m unittest discover -s tests
```

## Resources

In case you were wondering, this are some of the tools used to build the site.

* Theme foundation by [Poole](http://getpoole.com/).
* Syntax highlighting by [Prism](http://prismjs.com/).
* Brand icons by [Simple Icons](https://simpleicons.org/).
* Coded on [Atom](https://atom.io/).

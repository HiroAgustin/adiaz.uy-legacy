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

Publish this directory as-is on any static host. `.nojekyll` disables Jekyll
processing. Keep `CNAME` for the custom domain and configure other hosts to
serve `404.html` for missing URLs.
The existing images, `Resume.pdf`, feed, sitemap, and manifest are included.

### GitHub Pages

In **Settings > Pages**, set **Build and deployment > Source** to
**GitHub Actions** and keep the custom domain set to `adiaz.uy`.
The workflow in `.github/workflows/pages.yml` uploads the static files directly,
without Jekyll or a build step, and deploys on pushes to `master`.

Once the workflow is on `master`, you can also select **Actions > Deploy static
site to GitHub Pages > Run workflow** and choose a branch to deploy manually.
If the `github-pages` environment restricts deployment branches, allow the
selected branch in **Settings > Environments > github-pages** first.

Every deployment replaces the same live site at `adiaz.uy`; GitHub Pages does
not create separate branch previews. Pull requests do not deploy automatically.

### Netlify previews

`netlify.toml` overrides the previous Jekyll build command and publishes the
repository root directly, so Netlify deploy previews need no build step.

## Resources

In case you were wondering, this are some of the tools used to build the site.

* Theme foundation by [Poole](http://getpoole.com/).
* Syntax highlighting by [Prism](http://prismjs.com/).
* Brand icons by [Simple Icons](https://simpleicons.org/).
* Coded on [Atom](https://atom.io/).

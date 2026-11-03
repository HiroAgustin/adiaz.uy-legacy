# adiaz.uy

A static personal website built with Astro. My corner of the web.

## Local preview

Install dependencies and start the Astro development server:

```sh
npm ci
npm run dev
```

Astro serves the site at <http://localhost:4321/>. Run `npm run build` to
generate the static site in `dist/`, or `npm run preview` to preview that build.
The source HTML content is in `src/content/pages/`, and the shared document
layout is in `src/layouts/SiteLayout.astro`.

## Editing and publishing

Blog posts live in `src/content/blog/` as Markdown files with validated
frontmatter. The homepage, archive, about page, and 404 content are in
`src/content/pages/`; `home.html` is the home page and the other files keep
their existing routes. Shared layout and post markup live in `src/layouts/`
and `src/components/`. The homepage and archive, Atom feed, and sitemap retain
their existing post listings, so keep them synchronized when adding or
updating posts. Static assets, manifest, resume, and custom domain file are
served from `public/`.

### GitHub Pages

In **Settings > Pages**, set **Build and deployment > Source** to
**GitHub Actions** and keep the custom domain set to `adiaz.uy`.
The workflow in `.github/workflows/pages.yml` builds the Astro site and deploys
the generated `dist/` directory on pushes to `master`.

Once the workflow is on `master`, you can also select **Actions > Deploy static
site to GitHub Pages > Run workflow** and choose a branch to deploy manually.
If the `github-pages` environment restricts deployment branches, allow the
selected branch in **Settings > Environments > github-pages** first.

Every deployment replaces the same live site at `adiaz.uy`; GitHub Pages does
not create separate branch previews. Pull requests do not deploy automatically.

## Resources

Some resources used by the site:

* Theme foundation by [Poole](http://getpoole.com/).
* Syntax highlighting by [Prism](http://prismjs.com/).
* Brand icons by [Simple Icons](https://simpleicons.org/).
* Coded on [Atom](https://atom.io/).

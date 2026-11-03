# adiaz.uy

A static personal website built with Astro. My corner of the web.

## Local preview

Install dependencies and start the Astro development server:

```sh
npm ci
npm run dev
```

Astro serves the site at <http://localhost:4321/>. Run `npm run build` to generate the static site
in `dist/`, or `npm run preview` to preview that build. Run `npm run check` for Astro and TypeScript
diagnostics, and `npm run format` to format the source files.

## Editing and publishing

Blog posts live in `src/content/blog/` as Markdown files with validated `title`, `description`, and
`pubDate` frontmatter. Use Markdown for prose, links, headings, lists, and fenced code blocks. Astro
highlights code at build time; raw HTML is reserved for live SVG/CSS examples and warning callouts.

The homepage, archive, and previous/next navigation are generated from the same collection, ordered
newest first. The homepage shows only the latest post; the archive lists all posts. Other pages are
native `.astro` files in `src/pages/`. Shared layout and post markup live in `src/layouts/` and
`src/components/`.

Post navigation uses CSS-only cross-document view transitions in supported browsers. Animations
respect reduced-motion preferences and require no JavaScript.

The existing Atom feed and sitemap are static files in `public/`; keep them synchronized when adding
or updating posts. Static assets, manifest, resume, and custom domain file are also served from
`public/`.

### GitHub Pages

In **Settings > Pages**, set **Build and deployment > Source** to **GitHub Actions** and keep the
custom domain set to `adiaz.uy`. The workflow in `.github/workflows/pages.yml` builds the Astro site
and deploys the generated `dist/` directory on pushes to `master`.

Once the workflow is on `master`, you can also select **Actions > Deploy static site to GitHub
Pages > Run workflow** and choose a branch to deploy manually. If the `github-pages` environment
restricts deployment branches, allow the selected branch in **Settings > Environments >
github-pages** first.

Every deployment replaces the same live site at `adiaz.uy`; GitHub Pages does not create separate
branch previews. Pull requests do not deploy automatically.

## Resources

Some resources used by the site:

- Theme foundation by [Poole](http://getpoole.com/).
- Build-time syntax highlighting by [Shiki](https://shiki.style/).
- Brand icons by [Simple Icons](https://simpleicons.org/).
- Coded on [Atom](https://atom.io/).

## Licensing

No project-wide reuse license is granted for the site's original code or content.
Third-party material retains its applicable license; the Poole notice is preserved in
`public/third-party-notices.txt` and published at `/third-party-notices.txt`.

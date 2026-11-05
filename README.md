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

The RSS feed at `/rss.xml` is generated from the blog collection at build time, including full
rendered posts in RSS 2.0 format. The previous `/atom.xml` URL is no longer served.

The homepage, archive, and previous/next navigation are generated from the same collection, ordered
newest first. The homepage shows only the latest post; the archive lists all posts. Other pages are
native `.astro` files in `src/pages/`. Shared layout and post markup live in `src/layouts/` and
`src/components/`.

Site-wide navigation uses the browser's default CSS-only cross-document view transitions in supported
browsers, with no targeted elements. Animations respect reduced-motion preferences and require no
JavaScript.

The shared layout declares `color-scheme: light dark` through a meta tag. Styles use `light-dark()`
colors to follow the user's system preference automatically, without a toggle or JavaScript.

Static assets, manifest, resume, and custom domain file are served from `public/`.

### Netlify

The site is hosted on Netlify at `adiaz.uy`. Netlify builds the Astro site with `npm run build`
and publishes the generated `dist/` directory.

Keep GitHub Pages disabled in **Settings > Pages > Build and deployment > Source > Deploy from
a branch > Branch > None**. GitHub Pages' legacy Jekyll builder cannot build the Astro source
files and can send failure notifications even when the Netlify deployment succeeds.

### Sitemap

The sitemap at `/sitemap-index.xml` is generated from Astro's routes at build time and includes
`/Resume.pdf` as a custom entry. It is advertised in `robots.txt` and the shared layout.
The previous `/sitemap.xml` URL is no longer served.

### Automatic social sharing

The standalone `astro-buffer` integration shares new blog posts through Buffer.
Normal builds and previews never publish. A separate GitHub Actions workflow runs
`npm run social:publish` when blog content is pushed to `main`.

The package lives in the private `HiroAgustin/astro-buffer` repository. The publishing workflow
checks out a pinned revision using the read-only `ASTRO_BUFFER_DEPLOY_KEY` secret, builds it, and
installs it for that run only. Normal builds do not need the package or private repository access.
`src/buffer-posts.ts` adapts this site's collection and routes for the integration.

To enable it:

1. Generate a personal API key in Buffer's API settings and add it as the GitHub Actions secret
   `BUFFER_API_KEY`. It needs access to read channels and posts and create posts.
2. Find your organization ID using Buffer's API explorer (`account { organizations { id name } }`)
   and add it as the GitHub Actions variable `BUFFER_ORGANIZATION_ID`.
3. Connect your social accounts in that Buffer organization.

Adding a Markdown file in `src/content/blog/` publishes its title and canonical URL to every
connected, unlocked channel using Buffer's automatic `shareNow` mode. Edits and detected renames
do not reshare posts, and the existing archive is not backfilled. The workflow waits up to five
minutes per article for its production URL to return successfully before sharing.

It uses Buffer's experimental `createContentItem` mutation: one request per article creates all
remaining channel variants together. If any variant fails input validation, none are created.
Errors during subsequent processing can occur after records are created; reruns check those records
before submitting anything again.

This is a text/link announcement, not a media generator. Networks that require media or extra
metadata (such as Instagram, TikTok, YouTube, or Pinterest) may reject it. Buffer's validation
errors fail the workflow instead of silently omitting those channels. Disconnected/locked channels
are reported in the logs. Inspect Buffer for delivery failures after a post has been accepted.

Rerun a failed workflow to resume: existing posts in Buffer are matched by channel and article URL,
including queued, sent, and failed posts, so successful shares are not recreated. Existing drafts,
approval requests, or failed posts require attention in Buffer rather than creating replacements.
Do not delete those records if you want retries to remain duplicate-safe. Requests that create
posts are never automatically retried. Keep the article URL in the Buffer post text so the
duplicate check can recognize it.

For manual runs, choose **Share new blog posts** in Actions and provide the full commit SHA before
the new files were added. Locally, clone/build `HiroAgustin/astro-buffer`, then install it with
`npm install --no-save --package-lock=false ../astro-buffer`. Put the two Buffer credentials in the
ignored `.env` file, export `BUFFER_BASE_REF`, and run `npm run social:publish` from the checked-out
publishing commit.
The command loads `.env` automatically; CI environment variables take precedence.
Keep credentials out of source control; they are used only by the build process and never included
in the generated site.

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

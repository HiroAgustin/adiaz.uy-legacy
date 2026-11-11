# adiaz.uy

My personal website and blog, built with Astro.

## Local development

```sh
npm ci
npm run dev
```

The site runs at <http://localhost:4321/>.

## Blog posts

Create a post with `npm run blog -- "Post title"`. Add `--draft` to create it as a draft.

When committing a new post, choose its Buffer mode and channels. The prompt uses `BUFFER_API_KEY`
and `BUFFER_ORGANIZATION_ID` from `.env`.

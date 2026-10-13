# Recipe Journal

My cooking and baking recipes, and the story of learning to make them.

Built with [Astro](https://astro.build). Hosted on [Vercel](https://vercel.com). The "Ask" box answers visitors'
plain-English questions using Claude.

## Adding a recipe

1. Create a folder in `src/content/recipes/` named for the recipe's URL, e.g. `lemon-bars/`.
2. Copy `index.md` from one of the existing recipe folders into it and edit it.
3. Put photos in the same folder, then set them in the front matter:
   ```yaml
   photo: ./lemon-bars.jpg
   photoAlt: Lemon bars dusted with powdered sugar
   ```
   You can also add photos inside the write-up: `![Step 3 dough](./dough.jpg)`
4. Commit and push. Vercel rebuilds the site automatically in about a minute.

The `ingredients` list powers search, the "What can I make?" finder, and the Ask box, so keep each `item`
a plain ingredient name (`eggs`, `brown sugar`) and put quantities in `amount`. Put `amount` in quotes if it
contains a comma, e.g. `amount: "3 cloves, minced"`.

Set `draft: true` to hide a recipe while you're still working on it.

You can do all of this from the GitHub website: open the repo, go to `src/content/recipes`,
**Add file → Create new file**, and type `my-recipe/index.md` as the name. Drag photos in with **Add file → Upload files**.

## Adding a journal post

Create `src/content/journal/my-post.md` (see `welcome.md`). If the post has photos, use a folder
`src/content/journal/my-post/index.md` and put the photos next to it.

## Running locally

```sh
npm install
cp .env.example .env    # then paste your Anthropic API key into .env
npm run dev             # http://localhost:4321
```

## Project layout

| Path | What it is |
| --- | --- |
| `src/content/recipes/` | Recipes (one folder each, with photos) |
| `src/content/journal/` | Journal posts |
| `src/content.config.ts` | The fields a recipe/post can have |
| `src/pages/recipes/index.astro` | Search, filters, and the "What can I make?" finder |
| `src/pages/api/ask.ts` | Server route that answers questions with Claude |
| `src/styles/global.css` | Colors and fonts |

## Cost controls for the Ask box

- Set a monthly spend limit in the Anthropic Console (Settings → Limits). This is the real cap.
- `src/pages/api/ask.ts` limits questions to 500 characters and roughly 10 per visitor per hour.

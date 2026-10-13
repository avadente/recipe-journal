import { getCollection, type CollectionEntry } from 'astro:content';

export type Recipe = CollectionEntry<'recipes'>;

export async function getRecipes(): Promise<Recipe[]> {
  const all = await getCollection('recipes', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getJournal() {
  const all = await getCollection('journal', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function totalMinutes(r: Recipe) {
  return r.data.prepMinutes + r.data.cookMinutes;
}

export function formatMinutes(min: number) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/**
 * Plain-text description of every recipe, given to Claude so it can answer visitor questions.
 * Sorted by id so the text is identical between requests (keeps the prompt cache warm).
 */
export function recipeIndexText(recipes: Recipe[]) {
  return [...recipes]
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((r) => {
      const d = r.data;
      const ingredients = d.ingredients
        .map((i) => `${i.amount ? i.amount + ' ' : ''}${i.item}${i.optional ? ' (optional)' : ''}`)
        .join('; ');
      return [
        `<recipe id="${r.id}">`,
        `Title: ${d.title}`,
        `Summary: ${d.description}`,
        `Category: ${d.category} | Difficulty: ${d.difficulty} | Total time: ${totalMinutes(r)} min | Serves: ${d.servings}`,
        d.cuisine ? `Cuisine: ${d.cuisine}` : '',
        d.diet.length ? `Diet: ${d.diet.join(', ')}` : '',
        d.tags.length ? `Tags: ${d.tags.join(', ')}` : '',
        `Ingredients: ${ingredients}`,
        `Notes and method:\n${r.body ?? ''}`,
        `</recipe>`,
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');
}

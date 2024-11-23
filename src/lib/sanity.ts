import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
  throw new Error('Missing VITE_SANITY_PROJECT_ID');
}

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-02-25',
  useCdn: true, // Enable CDN caching
  perspective: 'published',
  stega: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
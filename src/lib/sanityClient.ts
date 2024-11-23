import { createClient } from '@sanity/client';
import { config } from './sanity.config';

export const sanityClient = createClient({
  projectId: config.projectId,
  dataset: config.dataset,
  apiVersion: config.apiVersion,
  token: config.token,
  useCdn: config.useCdn,
});

// Validate the connection immediately
sanityClient
  .fetch('*[_type == "sanity.imageAsset"][0]')
  .then(() => console.log('✅ Sanity connection successful'))
  .catch((err) => console.error('❌ Sanity connection failed:', err));
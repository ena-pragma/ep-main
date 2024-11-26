import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const token = import.meta.env.VITE_SANITY_TOKEN;

if (!projectId) {
  console.error("Missing VITE_SANITY_PROJECT_ID");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-02-25",
  useCdn: false,
  token,
  perspective: "published",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source?.asset?._ref) {
    return null;
  }

  try {
    return builder.image(source).auto("format").quality(80).fit("max").url();
  } catch (error) {
    return null;
  }
}

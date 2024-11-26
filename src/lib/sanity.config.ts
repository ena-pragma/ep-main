export const config = {
  projectId: process.env.VITE_SANITY_PROJECT_ID || "",
  dataset: process.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-02-25",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.VITE_SANITY_TOKEN,
};

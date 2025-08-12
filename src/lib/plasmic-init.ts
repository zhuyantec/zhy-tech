import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
// Remove unused import if not using Plasmic CMS
// import { createPlasmicCMSCache } from "@plasmicapp/loader-fetcher";

// --- IMPORTANT ---
// Ensure these environment variables are set in your .env.local or deployment environment
// You can find these in your Plasmic project settings under API Access / Tokens
const plasmicProjectId = process.env.PLASMIC_PROJECT_ID;
const plasmicAuthToken = process.env.PLASMIC_AUTH_TOKEN;
if (!plasmicProjectId) {
  throw new Error("Missing required environment variable: PLASMIC_PROJECT_ID");
}
// Auth token might be optional for public projects, but required for drafts or CMS data
// if (!plasmicAuthToken) {
//   console.warn("Warning: PLASMIC_AUTH_TOKEN environment variable is not set. Access might be limited.");
// }

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: plasmicProjectId!, // Assert non-null for id
      token: plasmicAuthToken || "", // Provide empty string if undefined
    },
  ],

  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published versions.
  preview: process.env.NODE_ENV === "development", // Use preview mode only in development

  // Optional: Set host for Plasmic CMS data fetching
  // host: "https://data.plasmic.app"
});

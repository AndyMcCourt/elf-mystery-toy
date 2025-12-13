<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17VNz8MpXMUSXN22w1b4rO9siLw4clqAA

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploying to GitHub Pages

This project is configured with a relative base path (``./``) in `vite.config.ts`,
which ensures assets load correctly when the site is served from a subpath such as
`https://<username>.github.io/<repository>/`. To deploy:

1. Build the site: `npm run build`
2. Publish the generated `dist/` folder to GitHub Pages (for example via the
   `gh-pages` branch or the Pages settings in your repository).

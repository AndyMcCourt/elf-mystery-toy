<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17VNz8MpXMUSXN22w1b4rO9siLw4clqAA

## About The Christmas Puzzle

The Christmas Puzzle is a festive, single-page riddle game. Players type a guess
to unlock a magical door, then click through to reveal a secret message once
they get the correct name. The experience includes snowfall, animations,
confetti, and sound effects to make the reveal feel celebratory.

## Gameplay

1. Enter a guess for the mystery person.
2. Correct guesses unlock the door and reveal a call-to-action button.
3. Click the door button to open the final reveal link.

## Configuration

The main story content and correct answers live in `constants.ts`:

- `VALID_ANSWERS` controls which guesses unlock the door.
- `SECRET_STORY_URL` sets the reveal link shown after unlocking.
- `GEMINI_SYSTEM_PROMPT` defines the prompt used for elf helper hints.

If you change any of these values, restart the dev server to see updates.

## Environment Variables

Create a `.env.local` file with the following key:

```
GEMINI_API_KEY=your_key_here
```

The Vite config maps `GEMINI_API_KEY` to `process.env.API_KEY` so the Gemini
client in `services/gemini.ts` can read it on the client side.

## Project Structure

- `App.tsx`: The main game layout, form logic, and modal reveal flow.
- `components/`: Visual effects and UI pieces like `MagicDoor`, `Snowfall`, and
  `ElfHelper`.
- `services/gemini.ts`: Client-side Gemini API wrapper for hint generation.
- `constants.ts`: Game configuration, answer list, and the reveal URL.

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

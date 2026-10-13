# İbrahim Yeler — Portfolio

A responsive Next.js portfolio based on the supplied visual reference. Dark navy, turquoise and violet, with nine original 3D assets generated with the built-in image_gen tool.

## Run locally

Requires Node.js 20.9 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For a production build, run `npm run build` and `npm start`.

## Checks

```sh
npm run typecheck
npm run build
npm run test:e2e
```

Browser tests expect Google Chrome and a running app at http://127.0.0.1:3102. Override with `PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e`.

## Included

- Responsive hero, filtered project gallery and accessible project dialogs.
- ChessFlutter project showcase featuring an on-device chess opponent, historical campaigns, unlockable themes and local progress. The generated cover is illustrative artwork based on the app game screen.
- About, technology toolkit, creative process and software architecture sections.
- Interactive Hexball concept and generative wave experiment.
- Motion switch, hover preview and command palette (⌘/Ctrl + K).
- Local portfolio guide with predefined answers about the displayed content; no AI service or external data collection.
- Contact form that opens a prefilled email to `ibrahimyeler10@gmail.com`. The visitor sends the message from their mail app; there is no server-side email service.
- Locally hosted Inter font, metadata, favicon, reduced-motion support and keyboard navigation.

## Edit

Page content and interactions: `app/page.tsx`. Styling and breakpoints: `app/globals.css`. Metadata: `app/layout.tsx`. Generated artwork: `public/images/*.webp`.

The original built-in generation prompts and source mapping are recorded in `docs/assets.json`; deployed images are self-contained in `public/images` and do not depend on those machine-local source paths. Product cover images are illustrative concepts. Project descriptions follow the supplied reference rather than claiming measured product results.
# ibrahimportfoy

## Automatic production deployment

Pushes to `main` automatically deploy this repository to [ibrahimyeler.com](https://ibrahimyeler.com) after successful checks. See [deployment documentation](deploy/README.md) for configuration and rollback.

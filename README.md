# Svelte Tailwind Extension Boilerplate

A basic Svelte Chrome Extension boilerplate that gets you started quickly. It supports modern, modular JavaScript, TailwindCSS for styling, and automatic reloading during development. Bundled using [Rollup](https://rollupjs.org/guide/en/).

## Get Started

Type this into your terminal:

```sh
npx degit kyrelldixon/svelte-tailwind-extension-boilerplate
yarn
```

### Development

For development with automatic reloading:

```sh
yarn dev
```

Open the [Extensions Dashboard](chrome://extensions), enable "Developer mode", click "Load unpacked", and choose the `dist` folder.

### Production

When it's time to publish to Chrome, make a production build. Run the following line:

```sh
yarn build
```

This will create a ZIP file with your package name and version in the `releases`
folder.

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Source Layout

Your manifest is at `src/manifest.json`, and Rollup will bundle any files you
include here. All the filepaths in your manifest should point to files in `src`.

## Features

- Simple Bundling with Rollup
- Chrome Extension reloader

## Resources

[Chrome Extension official documentation](https://developer.chrome.com/docs/webstore/)

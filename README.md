# Svelte Tailwind Extension Boilerplate

You can use this boilerplate code to start developing a Chrome extension using either JavaScript or [TypeScript](https://www.typescriptlang.org/), [Svelte](https://svelte.dev/) for the frontend, [Tailwind CSS](https://tailwindcss.com/) for styling, [Jest](https://jestjs.io/) for testing, and [Rollup](https://rollupjs.org/guide/en/) as the build system.

This boilerplate also comes with **automatic reloading** during development with the help of [rollup-plugin-chrome-extension](https://github.com/extend-chrome/rollup-plugin-chrome-extension). No more constantly refreshing the page to see your changes!

## Get Started

### Using `degit`

Type this into your terminal:

```sh
npx degit "kyrelldixon/svelte-tailwind-extension-boilerplate#main" your-extension-name
yarn
```

### Using the Github template

Github templates allow you to create a copy of a repo to build your own project with. Click **Use this template** at the top of the page to get your own copy.

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

```bash
src
├── background
│   └── index.js
├── content
│   └── index.js
├── manifest.json
└── popup
    ├── Counter.svelte
    ├── Counter.test.js
    ├── Popup.svelte
    ├── index.html
    ├── index.js
    └── tailwind.css
```

* `Popup.svelte` will become the extension's "browser action" popup
* `popup/index.js` tells `Popup` where to load in `index.html`. It is also where Tailwind CSS gets loaded
* `tailwind.css` is where you will add any custom tailwind styles

## Why these choices?

I wanted a boilerplate that would make it as easy as possible to get started building features and not setting up configurations. I also wanted the best possible extension development experience using modern tooling.

* **TypeScript**: TypeScript saves you from ambiguous bugs and makes it the code super easy to navigate through. I made it optional so that you have the freedom to opt into TypeScript's extra functionality when you want to.
* **Tailwind CSS**: This is my favorite CSS library because it helps me move fast. It's offers the perfect balance of speed and flexibility.
* **Svelte**: Svelte helps keep the bundle size small through it's compilation step, and makes the code easy to navigate. It's a newer framework, but I think it is perfect for small focused applications like browser extensions
* **Jest**: A clean framework that comes with everything you need for mocking, testing DOM interactions, and making sure your app is delivering the features you expect it to.
* **Rollup**: Rollup takes advantage of ES Modules which keeps your bundle sizes small and optimized. It is also much easier to read and update than Webpack.

## Acknowledgments

Special thanks to Jack and Amy at [extend-chrome](https://github.com/extend-chrome) for making [`rollup-plugin-chrome-extension`](https://github.com/extend-chrome/rollup-plugin-chrome-extension). Check out their repos if you're really looking to make developing extensions and easier and more enjoyable experience.

Other repos that helped me build the boilerplate:

* [Svelte Template's `setupTypeScript.js`](https://github.com/sveltejs/template/blob/master/scripts/setupTypeScript.js) served as a reference for my own script.
* [JS React Boilerplate](https://github.com/extend-chrome/js-react-boilerplate) gave me some ideas on how I could integrate `rollup-plugin-chrome-extension`
* [Chrome Extension Template](https://github.com/duo-labs/chrome-extension-boilerplate) helped me write out this README

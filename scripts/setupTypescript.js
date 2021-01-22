// @ts-check

// Modified based on https://github.com/sveltejs/template/blob/master/scripts/setupTypeScript.js

/** This script modifies the project to support TS code in .svelte files like:
  <script lang="ts">
  	export let name: string;
  </script>
 
  As well as validating the code for CI.
  */

/**  To work on this script:
  rm -rf test-template template && git clone sveltejs/template test-template && node scripts/setupTypeScript.js test-template
*/

const fs = require("fs");
const path = require("path");
const { argv } = require("process");

const projectRoot = argv[2] || path.join(__dirname, "..");

// Add deps to pkg.json
const packageJSON = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "package.json"), "utf8")
);
packageJSON.devDependencies = Object.assign(packageJSON.devDependencies, {
  "svelte-check": "^1.0.0",
  "svelte-preprocess": "^4.0.0",
  "@rollup/plugin-typescript": "^6.0.0",
  typescript: "^3.9.3",
  tslib: "^2.0.0",
  "@tsconfig/svelte": "^1.0.0",
  "ts-jest": "^26.4.4",
});

// Add script for checking
packageJSON.scripts = Object.assign(packageJSON.scripts, {
  validate: "svelte-check",
});

// Write the package JSON
fs.writeFileSync(
  path.join(projectRoot, "package.json"),
  JSON.stringify(packageJSON, null, "  ")
);

// mv src/popup/index.js to index.ts - note, we need to edit manifest.json for this too
const beforePopupIndexJSPath = path.join(
  projectRoot,
  "src",
  "popup",
  "index.js"
);
const afterPopupIndexTSPath = path.join(
  projectRoot,
  "src",
  "popup",
  "index.ts"
);
fs.renameSync(beforePopupIndexJSPath, afterPopupIndexTSPath);

// mv src/background/index.js to index.ts
const beforeBackgroundIndexJSPath = path.join(
  projectRoot,
  "src",
  "background",
  "index.js"
);
const afterBackgroundIndexTSPath = path.join(
  projectRoot,
  "src",
  "background",
  "index.ts"
);
fs.renameSync(beforeBackgroundIndexJSPath, afterBackgroundIndexTSPath);

// make the background script a module
fs.appendFileSync(afterBackgroundIndexTSPath, "\nexport {}\n");

// mv src/content/index.js to index.ts
const beforeContentIndexJSPath = path.join(
  projectRoot,
  "src",
  "content",
  "index.js"
);
const afterContentIndexTSPath = path.join(
  projectRoot,
  "src",
  "content",
  "index.ts"
);
fs.renameSync(beforeContentIndexJSPath, afterContentIndexTSPath);

// make the content script a module
fs.appendFileSync(afterContentIndexTSPath, "\nexport {}\n");

// Switch the Counter.svelte file to use TS
const counterSveltePath = path.join(
  projectRoot,
  "src",
  "popup",
  "Counter.svelte"
);
let counterFile = fs.readFileSync(counterSveltePath, "utf8");
counterFile = counterFile.replace("<script>", '<script lang="ts">');
fs.writeFileSync(counterSveltePath, counterFile);

// Switch index.js to index.ts in index.html
const popupHTMLPath = path.join(projectRoot, "src", "popup", "index.html");
let popupHTML = fs.readFileSync(popupHTMLPath, "utf8");
popupHTML = popupHTML.replace(`src="index.js"`, `src="index.ts"`);
fs.writeFileSync(popupHTMLPath, popupHTML);

// Replace name of entry points
const manifestPath = path.join(projectRoot, "src", "manifest.json");
const manifestJSON = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
manifestJSON.background.scripts = ["background/index.ts"];
manifestJSON.content_scripts = [
  {
    js: ["content/index.ts"],
    matches: ["https://*/*", "http://*/*"],
  },
];

// Write the manifest JSON
fs.writeFileSync(manifestPath, JSON.stringify(manifestJSON, null, "  "));

// Edit rollup config
const rollupConfigPath = path.join(projectRoot, "rollup.config.js");
let rollupConfig = fs.readFileSync(rollupConfigPath, "utf8");

// Edit imports
rollupConfig = rollupConfig.replace(
  `"rollup-plugin-terser";`,
  `"rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";`
);

// Add preprocessor
rollupConfig = rollupConfig.replace(
  "compilerOptions:",
  `preprocess: sveltePreprocess(),
      compilerOptions:`
);

// Add TypeScript
rollupConfig = rollupConfig.replace(
  "commonjs(),",
  `commonjs(),
    typescript({ sourceMap: false }),`
);
fs.writeFileSync(rollupConfigPath, rollupConfig);

// Add TSConfig
const tsconfig = `{
  "extends": "@tsconfig/svelte/tsconfig.json",
  "include": ["src/**/*"],
  "exclude": ["node_modules/*", "dist/*"]
}`;
const tsconfigPath = path.join(projectRoot, "tsconfig.json");
fs.writeFileSync(tsconfigPath, tsconfig);

// Add Svelte Config
const svelteConfigPath = path.join(projectRoot, "svelte.config.js");
fs.writeFileSync(
  svelteConfigPath,
  `const sveltePreprocess = require("svelte-preprocess");

module.exports = {
  preprocess: sveltePreprocess(),
};`
);

// Edit Jest Config
const jestConfigPath = path.join(projectRoot, "jest.config.js");
let jestConfig = fs.readFileSync(jestConfigPath, "utf8");

// Edit jest transform
jestConfig = jestConfig.replace(
  `"svelte-jester",`,
  `[
      "svelte-jester",
      {
        preprocess: true,
      },
    ],
    "^.+\\.js$": "babel-jest",
    "^.+\\.ts$": "ts-jest",`
);

// Edit jest file extensions
jestConfig = jestConfig.replace(
  `moduleFileExtensions: ["js", "svelte"],`,
  `moduleFileExtensions: ["js", "ts", "svelte"],`
);

fs.writeFileSync(jestConfigPath, jestConfig);

// Delete this script, but not during testing
if (!argv[2]) {
  // Remove the script
  fs.unlinkSync(path.join(__filename));

  // Check for Mac's DS_store file, and if it's the only one left remove it
  const remainingFiles = fs.readdirSync(path.join(__dirname));
  if (remainingFiles.length === 1 && remainingFiles[0] === ".DS_store") {
    fs.unlinkSync(path.join(__dirname, ".DS_store"));
  }
}

// Adds the extension recommendation
fs.mkdirSync(path.join(projectRoot, ".vscode"), { recursive: true });
fs.writeFileSync(
  path.join(projectRoot, ".vscode", "extensions.json"),
  `{
  "recommendations": ["svelte.svelte-vscode"]
}
`
);

console.log("Converted to TypeScript.");

if (fs.existsSync(path.join(projectRoot, "node_modules"))) {
  console.log(
    "\nYou will need to re-run your dependency manager to get started."
  );
}

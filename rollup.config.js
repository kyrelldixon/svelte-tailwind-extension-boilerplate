// rollup.config.js

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import zip from "rollup-plugin-zip";
import { terser } from "rollup-plugin-terser";
import {
  chromeExtension,
  simpleReloader,
} from "rollup-plugin-chrome-extension";
import { emptyDir } from "rollup-plugin-empty-dir";

const isProduction = !process.env.ROLLUP_WATCH;

export default {
  input: "src/manifest.json",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    simpleReloader(),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !isProduction,
      },
    }),
    // the plugins below are optional
    resolve({
      dedupe: ["svelte"],
    }),
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    commonjs(),
    // Empties the output dir before a new build
    emptyDir(),
    // If we're building for production, minify
    isProduction && terser(),
    // Outputs a zip file in ./releases
    isProduction && zip({ dir: "releases" }),
  ],
};

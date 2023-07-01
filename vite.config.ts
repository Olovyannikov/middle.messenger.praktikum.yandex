/** @type {import('vite').UserConfig} */

import {defineConfig} from "vite";

export default defineConfig({
    esbuild: {
        jsxFactory: 'jsx',
        jsxFragment: 'jsx.Fragment'
    }
})
import {resolve} from 'path';
import {defineConfig} from 'vite';

const generateScopedName = '[name]__[local]___[hash:base64:5]';

export default defineConfig({
    css: {
        modules: {
            generateScopedName,
        },
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/app/assets/styles/general/_mixins.scss";',
            },
        },
        devSourcemap: true,
    },
    resolve: {
        alias: [
            {
                find: "@/jsx", replacement: resolve(__dirname, "./src/jsx-runtime/index.ts"),
            },
            {
                find: "@", replacement: resolve(__dirname, "./src"),
            },
        ]
    }
});
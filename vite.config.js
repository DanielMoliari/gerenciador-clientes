import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/",
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
            buildDirectory: "build", // Certifica que o build vá para a pasta correta
        }),
        react(),
    ],
    build: {
        manifest: true,
        outDir: "public/build",
        rollupOptions: {
            output: {
                assetFileNames: "assets/[name]-[hash][extname]",
                chunkFileNames: "assets/[name]-[hash].js",
            },
        },
    },
    server: {
        https: true,
    },
});

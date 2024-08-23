import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base:
        process.env.NODE_ENV === "production"
            ? "https://gerenciador-clientes-daniel-ddcba2d51b3b.herokuapp.com/"
            : "/",
    plugins: [
        laravel({
            input: ["resources/js/app.jsx"],
            refresh: true,
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

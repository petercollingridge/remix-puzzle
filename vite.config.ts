import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: '/remix-puzzle/',
  plugins: [
    remix({
      basename: '/remix-puzzle/',
      ssr: false,
    }),
    tsconfigPaths(),
  ],
});

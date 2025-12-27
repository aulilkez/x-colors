import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  treeshake: true,
  target: "es2020",
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".cjs",
      dts: format === "esm" ? ".d.ts" : ".d.cts",
    };
  },
  esbuildOptions(options) {
    options.banner = {
      js: "// tcolors - Ultra-fast ANSI color library Copyright (c) 2024 - MIT License",
    };
  },
});

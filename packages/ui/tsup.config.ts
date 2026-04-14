import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'framer-motion', 'gsap', 'next', 'next/font/google'],
  sourcemap: true,
  injectStyle: true,
  banner: {
    js: '"use client";',
  },
});
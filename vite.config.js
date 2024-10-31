// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [
    vue(),
    legacy({
      targets: ['ie>=11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    Components({}),
  ],
  build: {
    assetsDir: 'assets', // 设置静态资源输出目录
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  publicDir: 'public',
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11'], // 兼容现代浏览器，排除 IE 11
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    Components({
      dirs: ['src/components'], // 自动导入 src/components 目录下的组件
      extensions: ['vue'], // 识别 .vue 文件
      deep: true, // 支持嵌套目录
      dts: 'src/components.d.ts', // 生成类型声明文件
    }),
  ],
  build: {
    target: 'esnext', // 输出更现代的代码
    assetsDir: 'assets', // 设置静态资源输出目录
    minify: 'terser', // 更优的压缩方式
    sourcemap: true, // 生成 source map 方便调试
    cssCodeSplit: true, // 分离 CSS，减少体积
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});

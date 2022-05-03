import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import themeColor from './src/utils/theme-config'

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import "@/style/common.less";',
        modifyVars: themeColor,
        javascriptEnabled: true,
      }
    }
  },
  server: {
    host: '127.0.0.1',
    port: 8000,
    open: true,
    https: false,
    proxy: {}
  },
  // build: {
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,
  //       drop_debugger: true
  //     }
  //   }
  // }
})

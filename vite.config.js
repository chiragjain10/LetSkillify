import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
    ],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    server: {
      host: true,
      port: 3000
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 3000,
      minify: 'esbuild',
      assetsDir: 'assets',
      rollupOptions: {}
    }
  }
})

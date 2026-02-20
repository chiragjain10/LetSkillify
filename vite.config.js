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
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react'
              }
              if (id.includes('@mui') || id.includes('@emotion')) {
                return 'vendor-mui'
              }
              if (id.includes('firebase')) {
                return 'vendor-firebase'
              }
              if (id.includes('framer-motion') || id.includes('lottie')) {
                return 'vendor-anim'
              }
              return 'vendor'
            }
          },
        },
      },
    },
  }
})
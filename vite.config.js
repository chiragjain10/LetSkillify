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
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Firebase and other heavy libraries
            if (id.includes('firebase')) {
              return 'vendor-firebase'
            }
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react'
            }
            // MUI and emotion
            if (id.includes('@mui') || id.includes('@emotion')) {
              return 'vendor-mui'
            }
            // Animation libraries
            if (id.includes('framer-motion') || id.includes('lottie')) {
              return 'vendor-anim'
            }
            // Other vendor libraries
            if (id.includes('node_modules')) {
              return 'vendor'
            }
            // App code
            return 'app'
          }
        }
      }
    }
  }
})
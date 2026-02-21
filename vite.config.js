import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      splitVendorChunkPlugin(),
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
            if (!id.includes('node_modules')) return
            if (id.includes('firebase')) return 'vendor-firebase'
            if (id.includes('react-dom') || id.includes('react-router') || /node_modules[\\/](react)[\\/]/.test(id)) return 'vendor-react'
            if (id.includes('@mui') || id.includes('@emotion')) return 'vendor-mui'
            if (id.includes('framer-motion') || id.includes('lottie')) return 'vendor-anim'
            if (id.includes('@reduxjs/toolkit') || id.includes('react-redux')) return 'vendor-redux'
            if (id.includes('bootstrap') || id.includes('bootstrap-icons')) return 'vendor-bootstrap'
            if (id.includes('lucide-react') || id.includes('react-icons')) return 'vendor-icons'
            if (id.includes('axios')) return 'vendor-network'
            if (id.includes('formik') || id.includes('yup')) return 'vendor-forms'
            if (id.includes('react-slick') || id.includes('slick-carousel')) return 'vendor-ui'
            return 'vendor'
          }
        }
      }
    }
  }
})

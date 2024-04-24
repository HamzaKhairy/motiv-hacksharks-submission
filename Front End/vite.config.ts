import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import path from 'path';
import image from '@rollup/plugin-image';
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    image()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },

  rollupInputOptions: {
    plugins: [
      // Example: Configure Rollup resolve plugin (this might be able to be deleted undetermined)
      {
        resolve: {
          alias:{
          '../assets/MotivLogo.png': path.resolve(__dirname, 'src/assets/MotivLogo.png'),
          },
        },
      },
    ],
  },
})

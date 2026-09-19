import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  server: {
    // `npm run dev` (plain Vite) does NOT run the /api serverless functions —
    // those only execute under `vercel dev`. If you run `vercel dev --listen 3000`
    // in one terminal and `vite` in another, this proxy forwards /api calls to it
    // so audit/audit-lead/send work while iterating on the frontend.
    // Prefer just running `vercel dev` alone when you need the API routes working.
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
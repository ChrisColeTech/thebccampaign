import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        proxy: {
            '/.netlify/functions': {
                target: 'http://localhost:9999/.netlify/functions',
                changeOrigin: true,
            },
        },
    },
})
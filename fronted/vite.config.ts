import react from '@vitejs/plugin-react-swc'
import {defineConfig} from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    build: {
        outDir: 'build',
    },
    server: {
        port: 8000,
        open: true,
        host: true
    },
})
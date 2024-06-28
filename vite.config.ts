import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/face_recoginition_brain/', // Correct repository name
    server: {
        hmr: true,
    },
});

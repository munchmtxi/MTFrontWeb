import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'server'), // Set root to server directory
  plugins: [react()],
  server: {
    port: 5173, // Consistent port
  },
});
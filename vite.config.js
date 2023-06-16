import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:  {
      src: path.resolve("./src"),
      components: path.resolve("./src/components"),
      pages: path.resolve("./src/pages"),
      store: path.resolve("./src/store"),
      layout: path.resolve("./src/layout"),
      styles: path.resolve("./src/styles")
    }
  }
})

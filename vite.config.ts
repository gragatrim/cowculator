import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function customHotReload() {
  return {
    name: 'custom-hot-reload',
    enforce: 'post',
    handleHotUpdate({file, server}) {
      if(file.endsWith('.tsx')) {
        server.ws.send({type: 'full-reload', path: '*'})
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), customHotReload()],
  base: "/cowculator/",
  // This is for people working on Windows with WSL, you have to enable polling which is CPU intensive
  server: {
    watch: {
      usePolling: true,
      interval: 1
    }
  }
});

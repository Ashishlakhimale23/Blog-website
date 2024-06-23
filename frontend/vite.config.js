import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from "dotenv"
dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
    "/user":{
      target:"https://blog-website-vh4r.onrender.com",
      changeOrigin:true,
    }
    }
  },
  define:{
    "process.env":process.env
  }
})

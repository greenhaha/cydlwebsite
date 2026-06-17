import { createPinia } from 'pinia'
import { createApp } from 'vue'
import './assets/main.css'
import './assets/tailwind.css'

import App from './App.vue'
import router from './router'


const storedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light')
document.documentElement.setAttribute('data-theme', initialTheme)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

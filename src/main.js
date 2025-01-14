import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from "firebase/app";

import App from './App.vue'
import router from '@/router'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID
};

initializeApp(firebaseConfig);

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

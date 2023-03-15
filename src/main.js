import { createApp } from 'vue'
import {createRouter, createWebHistory} from "vue-router";

import './style.css'

import App from './App.vue'
import HomeView from "./views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            name: 'home',
            component: HomeView
        },

    ]
})

createApp(App)
    .use(router)
    .mount('#app')
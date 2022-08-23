import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './permistion'

import './index.css'

/** Create Instance */
const app = createApp(App)

/** Use Store */
app.use(createPinia())

/** Use Router */
app.use(router)

/** Mount Element  */
app.mount('#app')

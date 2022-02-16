import { createApp } from 'vue'
import { store } from './stores'
import App from './App.vue'
import vSelect from 'vue-select'
import 'virtual:windi.css'
import 'vue-select/dist/vue-select.css'
import './main.css'

const app = createApp(App)

app.use(store)

app.component('v-select', vSelect)

app.mount('#site')
import { createApp } from 'vue'
import { store } from './stores'
import App from './App.vue'
import VeeValidatePlugin from './plugins/validation'
import vSelect from 'vue-select'
import 'virtual:windi.css'
import 'vue-select/dist/vue-select.css'
import './main.css'

const app = createApp(App)

//app.use(VeeValidatePlugin)

app.use(store)

app.component('v-select', vSelect)

app.mount('#site')
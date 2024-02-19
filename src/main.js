import { createApp } from "vue";
import App from "./App.vue";
import router from "./components/router/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import './mock/index.js'
// import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";
// import './mock/index.js'
import store from './store/auth.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


const app = createApp(App);

axios.defaults.baseURL = 'http://localhost:5054/api/';

app.use(router);
app.use(ElementPlus);
app.use(store);
// 遍历 ElementPlusIconsVue 对象的键值对
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
    // 注册组件到应用程序中
    app.component(key, component)
})

app.mount("#app");

import UsersVue from "../Users.vue";
import EntriesVue from "../Entries.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "../Login.vue";
import RegisterVue from "../Register.vue";
// 定义路由,指定对应关系
const routes = [
  {
    path: "/",
    redirect: "/Entries",
  },
  {
    path: "/Entries",
    component: EntriesVue,
  },
  {
    path:"/Users",
    component: UsersVue,
  },
  {
    path:"/Login",
    component: LoginVue,
  },
  {
    path:"/Register",
    component: RegisterVue,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

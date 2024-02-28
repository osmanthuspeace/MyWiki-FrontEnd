import UsersVue from "../Views/Users.vue";
import EntriesVue from "../Views/Entries.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "../Views/Login.vue";
import RegisterVue from "../Views/Register.vue";
import error from "../Views/Error.vue";
import tags from "../Views/Tags.vue";
import EntryDetail from "../Views/EntryDetail.vue";
import request from "../utils/request";
import UserInfo from "../Views/UserInfo.vue";

const routes = [
  {
    path: "/",
    redirect: "/entries",
  },
  {
    path: "/entries",
    component: EntriesVue,
  },
  {
    path: "/users",
    component: UsersVue,
    meta: { requiresAuth: true }, // 需要身份验证
  },
  {
    path: "/login",
    component: LoginVue,
  },
  {
    path: "/register",
    component: RegisterVue,
  },
  {
    path: "/error",
    component: error,
  },
  {
    path: "/tags",
    component: tags,
  },
  {
    path: "/entry/:id",
    name: "EntryDetail",
    component: EntryDetail,
    props: true, // 将路由参数作为组件的 props 传递
  },
  {
    path: "/roles",
    component: () => import("../Views/Roles.vue"),
  },
  {
    path: "/entry/edit/:id",
    component: () => import("../Views/Edit.vue"),
    props: true,
  },
  {
    path: "/userinfo",
    component: UserInfo,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;

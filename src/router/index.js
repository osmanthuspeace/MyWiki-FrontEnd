import UsersVue from "../Views/Users.vue";
import EntriesVue from "../Views/Entries.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "../Views/Login.vue";
import RegisterVue from "../Views/Register.vue";
import error from "../Views/Error.vue";
import tags from "../Views/Tags.vue";
import EntryDetail from "../Views/EntryDetail.vue";
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
  {
    path:"/create",
    component: () => import("../Views/Create.vue"),
  },
  {
    path:"/uploadpicture",
    component: () => import("../Views/UploadPicture.vue"),
  },
  {
    path:"/pictures",
    component: () => import("../Views/Pictures.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/error",
  },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  if (to.path === "/entries"&&(from.path=="/login"||from.path=="/entries"||from.path=="/userinfo")) {
    // console.log("跳转到主页");
    // 注意: 这将导致整个页面重新加载，可能不是最佳的用户体验
    window.location.reload();
  }
});

export default router;

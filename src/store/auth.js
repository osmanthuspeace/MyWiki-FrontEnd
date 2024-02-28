import { createStore } from "vuex";
import axios from "axios";
import router from "../router";
import request from "../utils/request";
import { set } from "nprogress";
import { sliderButtonEmits } from "element-plus/es/components/slider/src/button";
const store = createStore({
  state() {
    return {
      token: "",
      userInfo: {},
      username: "",
      isLoggedIn: false, // 登录状态，默认为 false
    };
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    getUsername(state) {
      return state.username;
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setLoginState(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      return request
        .post("User/Login", {
          Name: username,
          Password: password,
        })
        .then((res) => {
          const token = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("username", username);
          commit("setToken", token);
          commit("setUsername", username);
          commit("setLoginState", true);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout({ commit }) {
      // 清除 token
      commit("clearToken");
      // 清除 localStorage 中的 token
      localStorage.removeItem("token");
      window.location.reload();
      router.push("/");
    },
    // 可选：检查 token 是否有效
    // checkToken({ commit, state }) {
    //   if (state.token) {
    //     // 发送请求检查 token 是否有效
    //   }
    // },
  },
});
export default store;

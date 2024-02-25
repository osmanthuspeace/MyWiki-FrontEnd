import { createStore } from "vuex";
import axios from "axios";
import router from "../router";
const store = createStore({
  state() {
    return {
      token: "",
    };
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token; // 检查用户是否已通过身份验证
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async login({ commit }, { username, password }) {
      return axios
        .post("http://localhost:5054/api/User/Login", {
          Name: username,
          Password: password,
        })
        .then((res) => {
          const { data: JwtToken } = res;
          // localStorage.setItem('token', JwtToken)
          commit("setToken", JwtToken);
          router.push({ path: redirect.value || "/" }); // 登录成功后重定向到指定页面
          return JwtToken;
        }).catch((error) => {
          console.log(error);
        });
    },
  },
});
export default store;
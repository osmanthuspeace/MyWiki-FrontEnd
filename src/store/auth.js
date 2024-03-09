import { createStore } from "vuex";
import router from "../router";
import request from "../utils/request";
import { ElMessage } from "element-plus";

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
    getLoginState(state) {
      return state.isLoggedIn;
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
    async register( _ , { username, password }) { //填入的参数必须在第二个位置
      // console.log("username: " + username);
      // console.log("password: " + password);
      return request
        .post("/User/Register", {
          Name: username,
          Password: password,
        })
        .then(() => {
          ElMessage.success("注册成功");
          // console.log("注册成功");
        })
        .catch((error) => {
          console.log("This is the error " + error);
        });
    },
    async login({ commit }, { username, password }) {
      return request
        .post("/User/Login", {
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
          return true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout({ commit }) {
      commit("clearToken");
      localStorage.removeItem("token");
      commit("setLoginState", false);
      router.push("/");
    },
  },
});
export default store;

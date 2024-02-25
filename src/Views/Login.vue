<template>
  <div class="login-container">
    <el-form :model="loginForm" auto-complete="on" label-position="left">

      <div>
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
          tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">

        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
          placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin"
          class="password-input" />
        <span @click="showPwd" class="icon-wrapper">
          <el-icon v-if="showpwd" class="eye-icon">
            <View />
          </el-icon>
          <el-icon v-else class="eye-icon">
            <Hide />
          </el-icon>
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin">Login</el-button>
    </el-form>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const showpwd = ref(false);
const passwordType = ref('password')

const showPwd = () => {
  showpwd.value = !showpwd.value;
  passwordType.value = showpwd.value ? 'text' : 'password';
}

const loginForm = ref({
  username: '',
  password: ''
})

// ref 创建的引用是根据元素的挂载顺序来确定的，所以在模板中使用 ref 时，需要确保元素已经挂载
const loading = ref(false)
const redirect = ref(undefined)

const route = useRoute()
const router = useRouter()

const token = ref(localStorage.getItem('token') || '') // 使用 ref 定义 token 变量，并从 localStorage 中获取 token，如果不存在则为空字符串
const store = useStore() // 使用 useStore 获取 store 实例
const handleLogin = () => {
  store.dispatch('login', loginForm.value)
    .then(() => {
      router.push({ path: redirect.value || '/' }); // 登录成功后重定向到指定页面
    }).catch((e) => {
      console.log(e.response.data)
      loading.value = false
    });

}
//router.push({ path: redirect.value || '/' }); // 登录成功后重定向到指定页面

</script>

<style>
.login-container {
  width: 350px;
  margin: 20vh auto;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.password-input {
  position: relative;
}

.icon-wrapper {
  position: absolute;
  top: 50%;
  right: 10px;
  /* 调整图标距离输入框的右边距 */
  transform: translateY(-50%);
}

.eye-icon {
  cursor: pointer;
}
</style>

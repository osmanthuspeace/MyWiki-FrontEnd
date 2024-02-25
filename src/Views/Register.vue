<template>
  <div class="register">
    <h1 class="h">注册</h1>
    <form method="post" class="form">
      <label>请输入用户名</label>
      <input type="text" class="bod" v-model="username" placeholder="string" @input="checkUsername"/>

      <label>密码</label>
      <input type="password" class="bod" v-model="password" placeholder="123456"/>

      <button type="button" id="log" @click="register" :disabled="isUsernameChecking">注册</button>
      <p v-if="isUsernameChecking">正在检查用户名...</p>
      <p v-if="isUsernameExists">该用户名已被注册，请使用其他用户名。</p>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import {ref, watch, computed} from 'vue';

const username = ref('');
const password = ref('');
const isUsernameChecking = ref(false);
const isUsernameExists = ref(false);

const checkUsername = debounce(() => {

  if (username.value !== '') {
    isUsernameChecking.value = true;
    axios.get(`http://localhost:5054/api/User/CheckUserName?name=${username.value}`)
        .then(response => {
          isUsernameExists.value = response.data;
        })
        .catch(error => {
          isUsernameExists.value = error.response.data;
          console.error('Error checking username:', error);
        })
        .finally(() => {
          isUsernameChecking.value = false;
        });
  }

}, 500);

function register() {
  // Perform registration logic
}

// 防抖函数
function debounce(func, delay) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
</script>

<style scoped>
</style>

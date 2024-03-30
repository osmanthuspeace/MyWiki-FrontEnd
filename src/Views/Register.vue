<template>
  <div class="login-container">
    <el-form :model="loginForm" auto-complete="on" label-position="left">

      <div>
        <h3 class="title">Register Form</h3>
      </div>

      <el-form-item prop="username">
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
          tabindex="1" auto-complete="on" />
        <p style="color: red;" v-if="validname">{{ validname }}</p>
      </el-form-item>

      <el-form-item prop="password">

        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
          placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleRegister"
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
        @click.native.prevent="handleRegister">Register</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

// 引用和定义
const loginForm = ref({
  username: '',
  password: ''
});
const validname = ref(''); // 用于显示用户名验证信息
const loading = ref(false);
const showpwd = ref(false);
const passwordType = ref('password');

const router = useRouter();
const store = useStore();

// 显示或隐藏密码
const showPwd = () => {
  showpwd.value = !showpwd.value;
  passwordType.value = showpwd.value ? 'text' : 'password';
};

// 用户名和密码的验证规则
const validateUsername = async () => {
  if (loginForm.value.username.trim().length < 3 || loginForm.value.username.trim().length > 20) {
    validname.value = 'Username must be between 3 and 20 characters.';
    return false;
  }
  try {
    const response = await axios.get('/User/CheckUserName', {
      params: { name: loginForm.value.username }
    });
    if (response.data) {
      validname.value = 'Username is already taken.';
      return false;
    }
  } catch (error) {
    ElMessage.error(error.response.data || 'Username validation failed.');
    return false;
  }
  validname.value = '';
  return true;
};

const validatePassword = () => {
  if (loginForm.value.password.trim().length < 6 || loginForm.value.password.trim().length > 20) {
    ElMessage.error('Password must be between 6 and 20 characters.');
    return false;
  }
  return true;
};

// 注册处理
const handleRegister = async () => {
  if (!(await validateUsername()) || !validatePassword()) {
    return;
  }
  // console.log('registering...');
  // console.log(loginForm.value);
  loading.value = true;
  store.dispatch('register', loginForm.value)
    .then(() => {
      router.push('/login');
    }).catch((error) => {
      ElMessage.error(error.response.data || 'Registration failed.');
      loading.value = false;
    });
};

// 监控用户名变化以验证用户名
watch(() => loginForm.value.username, validateUsername);

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

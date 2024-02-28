<template>
    <header>
        <h1>MyWiki</h1>
        <div>
            <button class="login-button" @click="() => { router.push('/register') }">注册</button>
            <button v-if="!isLogged" class="login-button" @click="() => { router.push('/login') }">登录</button>
            <button v-if="isLogged" class="login-button" @click="() => { router.push('/userinfo') }">个人中心</button>
        </div>
    </header>
</template>

<script setup>
import router from '@/router';
import { ref, onMounted, onUnmounted } from 'vue';
const isLogged = ref(false);
onMounted(() => {
  isLogged.value = localStorage.getItem('token') !== null;
  console.log(isLogged.value);
  if (!isLogged.value) {
    // Message.error('Please login first');
    router.push('/');
  }
})


</script>

<style scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 60px;
    background-color: #f8f8f8;
}

h1 {
    width: 150px;
}

.login-button {

    background-color: #4A90E2;
    /* 蓝色调，友好且易于识别 */
    color: white;
    /* 文字颜色为白色，以确保对比度和可读性 */
    font-size: 14px;
    /* 适中的字体大小，提升可读性 */
    padding: 5px 14px;
    /* 内边距，确保按钮大小适中，易于点击 */
    margin-right: 10px;
    border: none;
    /* 无边框，现代化的扁平设计 */
    border-radius: 5px;
    /* 轻微的圆角，增加友好感 */
    cursor: pointer;
    /* 鼠标悬停时变为手形图标，明确表示这是一个可点击的按钮 */
    transition: background-color 0.3s, transform 0.2s;
    /* 平滑的背景颜色和变形过渡效果，提升用户体验 */
    outline: none;
    /* 点击按钮时不显示轮廓，保持视觉上的整洁 */
}

.login-button:hover {
    background-color: #357ABD;
    /* 鼠标悬停时颜色稍暗，提供视觉反馈 */
    transform: scale(1.05);
    /* 鼠标悬停时轻微放大，吸引用户注意 */
}

.login-button:active {
    background-color: #2E5A8A;
    /* 鼠标点击时颜色更暗，模拟按下效果 */
    transform: scale(0.95);
    /* 鼠标点击时轻微缩小，增加交互的真实感 */
}
</style>

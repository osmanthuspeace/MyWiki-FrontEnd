<template>
    <header>
        <h1 @click="toMain">MyWiki</h1>
        <div>
            <button v-if="!isLogged" class="login-button" @click="() => { router.push('/register') }">注册</button>
            <button v-if="!isLogged" class="login-button" @click="() => { router.push('/login') }">登录</button>
            <button v-if="isLogged" class="login-button" @click="() => { router.push('/userinfo') }">个人中心</button>
        </div>
    </header>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
const isLogged = ref(false);

const store = useStore();
isLogged.value = localStorage.getItem('token') !== null;

function toMain() {
    router.push('/');
}

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

h1:hover {
    cursor: pointer;
}

.login-button {

    background-color: #4A90E2;
    color: white;
    font-size: 14px;
    padding: 5px 14px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    outline: none;
    /* 点击按钮时不显示轮廓，保持视觉上的整洁 */
}

.login-button:hover {
    background-color: #357ABD;
    transform: scale(1.05);
}

.login-button:active {
    background-color: #2E5A8A;
    transform: scale(0.95);
    /* 鼠标点击时轻微缩小，增加交互的真实感 */
}
</style>

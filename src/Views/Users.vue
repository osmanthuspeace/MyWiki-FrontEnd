<template>
    <div class="container">
        <h2>User List</h2>

        <div class="user-container">
            <div class="user" v-for="user in users" :key="user.id">
                <div>name:{{ user.name }}</div>
                <div>Role:{{ user.roleName }}</div>
                <el-button v-if="user.roleName === 'User'" @click="setAsAdmin(user)">设为管理员</el-button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import request from '@/utils/request';
const users = ref([]);

const loadUsers = () => {
    request.get('http://localhost:5054/api/User/GetUsers')
        .then(response => {
            users.value = response.data;
        })
        .catch(error => {
            console.error('Error loading users:', error);
        });
};

const setAsAdmin = (user) => {
    request.post('/User/SetAdmin?name='+user.name).then(response => {
        alert('Set as admin successfully!')
        loadUsers();
    }).catch(error => {
        console.error('Error setting as admin:', error);
    })
}

onMounted(() => {
    loadUsers();
})
</script>

<style scoped>
.container {
    max-width: 800px;
    /* 容器的最大宽度，保证内容在大屏幕上也能良好展示 */
    margin: 0 auto;
    /* 居中显示 */
    padding: 20px;
    /* 内边距，增加内容与边框的距离 */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* 使用通用字体，保证兼容性和可读性 */
}

h2 {
    color: #333;
    /* 标题颜色 */
    text-align: center;
    /* 标题居中 */
    margin-bottom: 20px;
    /* 与用户列表的间距 */
}

.user-container {
    display: flex;
    /* 使用Flex布局 */
    flex-direction: column;
    /* 子项垂直排列 */
    gap: 15px;
    /* 设置用户之间的间距 */
}

.user {
    border: 1px solid #ddd;
    /* 用户项边框 */
    padding: 10px;
    /* 用户项内边距 */
    border-radius: 5px;
    /* 圆角边框 */
    background-color: #f9f9f9;
    /* 轻微的背景色差异 */
    transition: box-shadow 0.3s ease-in-out;
    /* 平滑的阴影过渡效果 */
}

.user:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    /* 鼠标悬停时的阴影效果 */
}

.user div {
    margin: 5px 0;
    /* 用户信息之间的间距 */
}

.user div:first-child {
    font-weight: bold;
    /* 加粗显示用户名 */
}
</style>

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
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    /* 使用通用字体，保证兼容性和可读性 */
}

h2 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
}

.user-container {
    display: flex;
    flex-direction: column;
    /* 子项垂直排列 */
    gap: 15px;
    /* 设置用户之间的间距 */
}

.user {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
    background-color: #f9f9f9;
    transition: box-shadow 0.3s ease-in-out;
}

.user:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    /* 鼠标悬停时的阴影效果 */
}

.user div {
    margin: 5px 0;
}

.user div:first-child {
    font-weight: bold;
    /* 加粗显示用户名 */
}
</style>

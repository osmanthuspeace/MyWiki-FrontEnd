<template>
    <div class="container">
        <h2>User List</h2>
        <button @click="loadUsers">Load Users</button>

        <div class="user-container">
            <div class="user" v-for="user in users" :key="user.id">
                <div>name:{{ user.name }}</div>
                <div>Role:{{ user.roleName }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
const users = ref([]);

const loadUsers = () => {
    axios.get('http://localhost:5054/api/User/GetUsers')
        .then(response => {
            users.value = response.data;
        })
        .catch(error => {
            console.error('Error loading users:', error);
        });
};
</script>

<style scoped>
.container {
    background-color: navajowhite;
    height: 100%;
    border-radius: 10px;
}

.user-container {
    display: flex;
    flex-wrap: wrap;
}

.user {
    width: 200px;
    height: 100px;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: #f0f0f0;
    box-sizing: border-box;
}
</style>
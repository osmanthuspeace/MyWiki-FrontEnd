<template>
    <div class="login">
        <h1 class="h">登录</h1>
        <form method="post" class="form">
            <label>请输入用户名</label>
            <input type="text" class="bod" id="number" placeholder="B230405" />

            <label>密码</label>
            <input type="Password" class="bod" id="password" placeholder="123456" />

            <button type="button" id="log" @click="jump">登录</button>
        </form>
    </div>
    <div></div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
function jump() {

    axios.post('http://localhost:5054/api/User/Login', {
        name: document.getElementById('number').value,
        password: document.getElementById('password').value
    })
    .then(response => {
        console.log(response.data);
        if (response.data) {
            window.location.href = "/Entries";
        }
    })
    .catch(error => {
        alert('登录失败');
        console.error('Error loading users:', error);
    });
}
</script>

<style scoped>
.login {
    align-items: center;
    font-size: 1rem;
    overflow: hidden;
    margin: 20vh 15vw;
    border-radius: 10px;
    background-color: indianred;
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    margin: 10px;
}

.login .bod {

    font-size: 1.1rem;
    width: 30vw;
    height: 3vh;
    padding: 0.6rem 0 0.6rem 0.6vw;

    border: solid;
    border-radius: 20px;
    border-color: gray;
    box-sizing: border-box;

}

.h {
    background-color: blue;
    color: #284962;
    text-align: center
}

label {
    color: grey;
    font-size: 1rem;
    margin: 0 0 0 1vw;
}

#log {
    /* 登录按钮 */
    width: 25vw;
    height: 4vh;
    border: none;
    border-radius: 20px;
    color: white;
    background-color: #284962;
    font-size: 1.2rem;
    margin: 10px 0;
}

#log:hover {
    background-color: #3e6a8e;
}
</style>

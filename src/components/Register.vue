<template>
    <div class="register">
        <h1 class="h">注册</h1>
        <form method="post" class="form">
            <label>请输入用户名</label>
            <input type="text" class="bod" id="number" placeholder="B230405" />

            <label>密码</label>
            <input type="Password" class="bod" placeholder="123456" />

            <button type="button" id="log" @click="jump">注册</button>
        </form>
    </div>
    <div></div>
</template>

<script setup>
function jump() {
    window.location.href = "/Entries";
}
</script>

<style scoped>

</style>
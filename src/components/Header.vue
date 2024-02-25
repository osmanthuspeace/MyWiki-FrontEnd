<template>
    <header>
        <img src="../assets/logo.png" alt="MyWiki">
        <h1>MyWiki</h1>
        <div>
            <router-link to="/Register" > 注册 </router-link>
            <router-link to="/Login" > 登录 </router-link>
        </div>
    </header>
</template>

<script setup>

</script>
<style scoped>
header {
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content:space-around;
    opacity: 0.95;
}

img{
    margin: 10px; 
}
</style>

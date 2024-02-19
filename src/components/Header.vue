<template>
    <header>
        <img src="../assets/logo.png" alt="MyWiki">
        <h1>MyWiki</h1>
        <nav>
            <router-link to="/Entries" class="route"> 角色列表 </router-link>
            <router-link to="/Users" class="route"> 用户列表 </router-link>
        </nav>
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
    /* overflow: hidden; */
    background-color: gray;
    display: flex;
    justify-content: space-between;
    opacity: 0.95;
    border-radius: 10px;
}

header nav {
    margin: 10px;
    display: flex;
    width: 300px;
    background-color: aqua;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}

header nav .route {
    margin: 10px;
    border: solid 1px red;

    list-style: none;
    background-color: green;
    height: 40px;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    text-align: center;
}
img{
    margin: 10px; 
}
</style>

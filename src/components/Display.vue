<template>
    <div class="dis">
        <!-- <NavBarVue /> -->
        <router-view></router-view>
    </div>
</template>
  
<script setup>
import NavBarVue from './NavBar.vue';

</script>
  
<style scoped>
.dis {
    border: 1px solid #ebeef5;
    flex: 1;
    height: 100%;
}
</style>
  
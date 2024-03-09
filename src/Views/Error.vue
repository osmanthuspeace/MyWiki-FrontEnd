<template>
    <div class="not-found">
        <h1>404</h1>
        <p>抱歉，您访问的页面不存在。</p>
        <el-button type="primary" @click="back" style="margin-top: 10px;">
            返回首页
        </el-button>
    </div>
</template>
  
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function back() {
    router.push('/');
}
</script>
  
<style scoped>
.not-found {
    /* display: flex; */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.not-found h1 {
    font-size: 5rem;
}

.not-found p {
    font-size: 1.5rem;
}
</style>
  
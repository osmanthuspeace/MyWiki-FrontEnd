<template>
    <el-descriptions class="margin-top" title="UerInfo" :column="1" :size="size" border width>
        <!-- <template #extra>
      <el-button type="primary">Operation</el-button>
    </template> -->
        <el-descriptions-item width="150px">
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <user />
                    </el-icon>
                    Username
                </div>
            </template>
            {{ name }}
        </el-descriptions-item>

        <el-descriptions-item>
            <template #label>
                <div class="cell-item">
                    <el-icon :style="iconStyle">
                        <tickets />
                    </el-icon>
                    Role
                </div>
            </template>
            <el-tag size="small">{{ role }}</el-tag>
        </el-descriptions-item>
    </el-descriptions>
    <el-button type="danger" @click="loginout" style="margin-top: 20px;">退出登录</el-button>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import request from '@/utils/request';
import router from '@/router';
import { useStore } from 'vuex';
const name = ref('');
const role = ref('');
const store = useStore();

function loginout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    store.commit('setToken', '');
    store.commit('setUsername', '');
    router.push('/');
}


onMounted(() => {
    name.value = localStorage.getItem('username');
    console.log(name.value);
    request.get('/User/GetUserInfoByName?name=' + name.value)
        .then(response => {
            role.value = response.data.roleName;
            // console.log(response.data);
        }).catch(error => {
            console.error('Error loading user info:', error);
        })
})
</script>

<style scoped>
.margin-top {
    padding-top: 50px;
    max-width: 600px;
    margin: 0 auto;
}
</style>

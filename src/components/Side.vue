<template>
  <el-menu class="el" :default-openeds="['1', '2']" :collapse="isCollapse" :style="{ width: isCollapse ? '' : '200px' }"
    v-show="isLogged">
    <el-menu-item index="1">
      <template #title>
        <div @click="toUserInfo">
          <el-icon>
            <Setting />
          </el-icon>
          <span>Dashboard</span>
        </div>
      </template>
    </el-menu-item>


    <el-sub-menu index="2">
      <template #title>
        <div>
          <el-icon>
            <User />
          </el-icon>
          <span>用户管理</span>
        </div>
      </template>
      <el-menu-item index="2-1" @click="toUsers">User List</el-menu-item>
      <!-- <el-menu-item index="2-2" @click="toRoles">Roles</el-menu-item> -->

    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <div>
          <el-icon>
            <Grid />
          </el-icon>
          <span>词条管理</span>
        </div>
      </template>
      <el-menu-item index="3-1" @click="toEntries">Entry List</el-menu-item>
      <el-menu-item index="3-2" @click="toTags">Tags</el-menu-item>
      <el-menu-item index="3-3" @click="toCreate">Create new Entries</el-menu-item>
    </el-sub-menu>
    <!-- 其他菜单项省略 -->
  </el-menu>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Message } from "@element-plus/icons-vue";
import router from '@/router';
import { useStore } from 'vuex';
const isCollapse = ref(false);
const isLogged = ref(false);

function toUsers() {
  router.push('/users');
}
function toEntries() {
  router.push('/entries');
}
function toTags() {
  router.push('/tags');
}
function toRoles() {
  router.push('/roles');
}
function toUserInfo() {
  router.push('/userInfo');
}
function toCreate() {
  router.push('/create');
}
const store = useStore();

// isLogged.value = store.getters.getLoginState;
isLogged.value = localStorage.getItem('token') !== null;

</script>

<style scoped>
div {
  overflow: hidden;
  height: 100%;
  width: auto;
  opacity: 0.95;
}

el-sub-menu {
  padding-left: 0;
}

.el {
  border: 0;
}
</style>

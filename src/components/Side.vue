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
    <el-sub-menu index="4">
      <template #title>
        <div>
          <el-icon><Files /></el-icon>
          <span>图片管理</span>
        </div>
      </template>
      <el-menu-item index="4-1" @click="toPictures">Picture List</el-menu-item>
      <el-menu-item index="4-2" @click="toUploadPicture">Upload Picture</el-menu-item>
    </el-sub-menu>


  </el-menu>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
  router.push('/userinfo');
}
function toCreate() {
  router.push('/create');
}
function toUploadPicture() {
  router.push('/uploadpicture');
}
function toPictures() {
  router.push('/pictures');
}

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

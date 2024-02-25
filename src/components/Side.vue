<template>
  <div>
    <h1>Side</h1>
    <el-aside style="width: 200px">
      <el-scrollbar>
        <el-collapse-transition>
          <el-menu :default-openeds="['1', '2']" style="width: 100%">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <User />
                </el-icon>
                <span v-if="showText" @click="toUsers">用户列表</span>
              </template>

              <el-menu-item index="1-1" @click="toRoles">Roles</el-menu-item>

            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <Grid />
                </el-icon>
                <span v-if="showText" @click="toEntries">词条列表</span>
              </template>
              <el-menu-item index="1-1" @click="toTags">Tags</el-menu-item>

            </el-sub-menu>
            <!-- 其他菜单项省略 -->
          </el-menu>
        </el-collapse-transition>
      </el-scrollbar>
    </el-aside>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { Message } from "@element-plus/icons-vue";
import router from '@/router';
const showSidebar = ref(true);
const showText = ref(true); // 控制是否显示菜单项文字

const handleResize = () => {
  showSidebar.value = window.innerWidth >= 400;
  showText.value = window.innerWidth >= 400; // 根据窗口宽度决定是否显示菜单项文字
};


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
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
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
</style>

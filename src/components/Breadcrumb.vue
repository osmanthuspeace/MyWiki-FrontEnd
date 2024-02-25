<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index===levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import pathToRegexp from 'path-to-regexp'
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const levelList=ref(null);
const route=useRoute();
const router=useRouter();

const pathCompile=(path)=>{
  // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
  const {params}=route;//从 route 对象中提取了 params 属性，并将其赋值给了名为 params 的变量。
  const toPath=pathToRegexp.compile(path);
  return toPath(params)
}

const isDashboard=(route)=>{
  const name=route && route.name;//如果 route 存在，则将 route.name 的值赋给 name 变量；如果 route 不存在，则将 name 变量赋值为 route 的值（通常为 null 或 undefined）
  if(!name)return false;
  return name.trim().toLowerCase() === 'dashboard'.toLowerCase();
}

const getBreadcrumb=()=>{
  let matched=route.matched.filter(item=>item.meta && item.meta.title)//过滤掉没有设置标题的路由项
  //route.matched是一个数组，包含当前路由匹配到的所有路由记录
  const first=matched[0];
  if(!isDashboard(first)){
    matched=[
        {
          path:'/dashboard',
          meta: { title: 'Dashboard' }
        }
    ].concat(matched)//这一段代码判断当前路由是否为 "dashboard" 路由。如果不是，则将一个名为 "Dashboard" 的路由项添加到 matched 数组的开头。这样做是为了确保面包屑导航的第一个项始终是 "Dashboard"。
  }
  levelList.value=matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

const handleLink=(item)=>{
  const {redirect,path} = item;
  if(redirect){
    router.push(redirect);
    return ;
  }
  router.push(pathCompile(path));
}
watch(route, getBreadcrumb);//当 route 对象发生变化时，即当前路由发生变化时，getBreadcrumb 函数会被调用
onMounted(getBreadcrumb);
</script>

<style scoped>

</style>
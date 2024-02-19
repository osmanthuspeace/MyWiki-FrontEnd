<template>
  <div class="up">
    <Header />
  </div>
  <div class="section">
    <Side />
    <Display />
  </div>
  <!-- <Layout /> -->
</template>

<script setup>
import Header from './components/Header.vue';
import Side from './components/Side.vue';
import Entries from './components/Entries.vue';
import Layout from './components/Layout.vue';
import Display from './components/Display.vue';
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.up {
  /* display: flex; */
  min-height: 80px;
  box-sizing: border-box;
  display: flow-root;
}

.section {
  
  display: flex;
  flex: 1;
  flex-direction: row;
}
</style>

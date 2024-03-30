<template>
  <div class="up">
    <Header />
  </div>
  <div class="section">
    <Side />
    <Display />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Side from './components/Side.vue';
import Display from './components/Display.vue';
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
  min-height: 60px;
}

.section {
  display: flex;
  flex: 1;
  flex-direction: row;
}
</style>

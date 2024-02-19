<template>
    <div class="container">
        <h2>Entry List</h2>
        <button @click="loadEntries">Load Entries</button>

        <div class="entry-container">
            <div class="entry" v-for="entry in entries" :key="entry.id">
                <div>title:{{ entry.title }}</div>
                <div>content:{{ entry.content }}</div>
                <div>category:{{ entry.categoryName }}</div>
                <ul>tag:
                    <li v-for="tag in entry.tagNames" :key="tag.id">{{ tag }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import { ref } from 'vue';

// 定义响应式数据
const entries = ref([]);

// 加载词条数据的函数
const loadEntries = () => {
    axios.get('http://localhost:5054/api/Entry/GetEntries')
        .then(response => {
            console.log(response.data);
            // 请求成功，更新词条数据
            entries.value = response.data;
        })
        .catch(error => {
            // 请求失败，输出错误信息
            console.error('Error loading entries:', error);
        });
};
</script>
  
<style scoped>
.container {
    background-color: aqua;
    height: 100%;
    border-radius: 10px;
    padding: 10px;
    box-sizing: border-box;
}

.entry-container {
    display: flex;
    flex-wrap: wrap;
}

.entry {

    width: 250px;
    height: 250px;
    margin: 10px;
    padding: 10px;
    border: 1px solid black;
    background-color: white;
    border-radius: 10px;
}
</style>
  
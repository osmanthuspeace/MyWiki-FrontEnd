<template>
    <div class="container">
        <h2>{{ entry.title }}</h2>
        <div class="content">
            <span>content: </span>
            <pre>{{ entry.content }}</pre>
        </div>
        <div class="tag">
            <span>Tags:</span>
            <span v-for="tag in entry.tagNames">
                <el-tag>{{ tag }}</el-tag>
            </span>
        </div>
        <el-button @click="back" class="button">返回</el-button>
    </div>
    <el-button type="primary" @click="edit" v-if="isLogged">编辑</el-button>
    <el-button type="danger" @click="deletefun" v-if="isLogged">删除</el-button>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router';
import { ElMessage } from 'element-plus';

const isLogged = ref(false);

isLogged.value = localStorage.getItem('token') !== null;

const entry = ref({});

const props = defineProps({
    id: String
});
axios.get('/Entry/GetEntryById/' + props.id)
    .then(response => {
        // console.log(response.data);
        entry.value = response.data;
    }).catch(error => {
        console.error('Error loading entry detail:', error);
    })

const edit = () => {
    router.push(`/entry/edit/${props.id}`);
}

const deletefun = () => {
    ElMessage({
        message: ' Simulate delete this entry',
        type: 'info',
        showClose: true,
    });
}

const back = () => {
    router.back();
}
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 10px auto;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-family: Arial, sans-serif;
}

h2 {
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
}

.content {
    margin-top: 20px;
    line-height: 1.6;
}

.content span {
    font-weight: bold;
}

.content pre {
    background-color: #f6f8fa;
    padding: 10px;
    border-radius: 5px;
    white-space: pre-wrap;
    /* 保留空白符和换行，同时允许自动换行 */
    word-wrap: break-word;
    /* 长单词或URL自动换行 */
}

.tag {
    margin-top: 20px;
}

.tag span {
    margin-right: 5px;
}

.button {
    margin-top: 20px;
}
</style>
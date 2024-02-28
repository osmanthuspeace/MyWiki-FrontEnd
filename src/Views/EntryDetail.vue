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

    </div>
    <el-button type="primary" @click="edit">编辑</el-button>
    <el-button type="danger" v-if="false">删除</el-button>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import axios from 'axios';
import router from '@/router';
const entry = ref({});

const props = defineProps({
    id: String 
});
axios.get('/Entry/GetEntryById/' + props.id)
    .then(response => {
        console.log(response.data);
        entry.value = response.data;
    }).catch(error => {
        console.error('Error loading entry detail:', error);
    })

const edit = () => {
    router.push(`/entry/edit/${props.id}`);
}
</script>

<style scoped>
.container {
    padding-top: 10px;
    margin: 0 auto;
    width: 400px;
}

.content {
    margin: 1px auto;
    border: 1px solid #ccc;
    width: 400px;
}

.tag {
    margin: 1px auto;
    width: 400px;
}

.tag>* {
    margin-right: 5px;
}
</style>
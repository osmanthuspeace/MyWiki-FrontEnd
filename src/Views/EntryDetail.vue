<template>
    <div>
        <h2>Entry Detail</h2>
        <h3>{{ entry.title }}</h3>
        <pre>{{ entry.content }}</pre>
        <p>{{ entry.tagNames }}</p>
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
    id: String // 假设 entryId 是一个字符串类型的 props
});
axios.get('/Entry/GetEntryById/' + props.id)
    .then(response => {
        console.log(response.data);
        entry.value = response.data;
        // sessionStorage.setItem('entryDetail', JSON.stringify(response.data));
    }).catch(error => {
        console.error('Error loading entry detail:', error);
    })

const edit = () => {
    router.push(`/entry/edit/${props.id}`);
}
</script>

<style scoped></style>
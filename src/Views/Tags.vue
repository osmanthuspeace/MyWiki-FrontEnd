<template>
    <div class="container">
        <h1>Tags</h1>
        <div class="div">
            <div v-for="tag in tags" :key="tag.tagId">
                <el-tag class="tags">{{ tag.tagName }}</el-tag>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
const tags = ref([]);
const loadTags = () => {
    axios.get('/Entry/GetTags')
        .then(response => {
            // console.log(response.data);
            tags.value = response.data;
        })
        .catch(error => {
            router.push('/error');
            console.error('Error loading tags:', error);
        });
};
onMounted(() => {
    loadTags();
});
</script>

<style scoped>
.container {
    max-width: 800px;
    margin: 20px auto;
    padding: 10px;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.div {
    display: flex;
    flex-wrap: wrap;
    /* 允许标签换行 */
    gap: 10px;
    /* 设置标签之间的间距 */
    justify-content: center;
    /* 使标签在容器中居中对齐 */
}

.tags {
    cursor: pointer;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
}
</style>
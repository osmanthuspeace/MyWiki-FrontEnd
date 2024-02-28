<template>
    <div class="container">
        <h1>Tags</h1>
        <div class="div">
            <div v-for="tag in tags" :key="tag.tagId">
                <el-tag class="tags">{{ tag.tagName }}</el-tag>
            </div>
        </div>
        <el-pagination style="justify-content: center;" v-model:current-page="currentPage" v-model:page-size="pageSize"
      :small=false layout="prev, pager, next, jumper" :total=entryNum @current-change="handleCurrentChange"
      :hide-on-single-page="true" />
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
    gap: 10px;
    justify-content: center;
}

.tags {
    cursor: pointer;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 5px;
}
</style>
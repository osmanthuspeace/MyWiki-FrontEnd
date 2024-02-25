<template>
    <div class="container">
        <h1>Tags</h1>
        <div v-for="tag in tags" :key="tag.tagId">
            <span class="tags">{{ tag.tagName }}</span>
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
            console.log(response.data);
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
    background-color: aqua;
    width: 300px;
    border-radius: 20px;

    padding: 10px;
    box-sizing: border-box;
}

.tags {
    display: inline-block;
    margin-right: 5px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: greenyellow;
    color: #333;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    transition: all 0.3s;
}
</style>
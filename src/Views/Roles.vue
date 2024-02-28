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
    /* 限制容器的最大宽度，你可以根据实际需要调整 */
    margin: 20px auto;
    /* 居中显示，并添加上下边距 */
    padding: 10px;
    /* 容器内边距 */
}

h1 {
    text-align: center;
    /* 标题居中 */
    margin-bottom: 20px;
    /* 与下方内容的间隔 */
}

.div {
    display: flex;
    /* 使用Flex布局 */
    flex-wrap: wrap;
    /* 允许标签换行 */
    gap: 10px;
    /* 设置标签之间的间距 */
    justify-content: center;
    /* 使标签在容器中居中对齐 */
}

.tags {
    cursor: pointer;
    /* 将鼠标光标变为指针，表明这是可点击的 */
    padding: 5px 10px;
    /* 标签内边距，增加点击区域和视觉效果 */
    font-size: 14px;
    /* 设置标签文字大小 */
    border-radius: 5px;
    /* 轻微的圆角边框，看起来更友好 */
    /* 你可以添加更多样式来定制标签的颜色、边框等 */
}
</style>
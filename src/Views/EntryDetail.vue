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
    <el-button type="danger" v-if="isLogged">删除</el-button>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import axios from 'axios';
import router from '@/router';

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

const back = () => {
    router.back();
}
</script>

<style scoped>
.container {
    max-width: 800px;
    /* 容器最大宽度，保证内容在大屏幕上也能良好阅读 */
    margin: 10px auto;
    /* 水平居中显示 */
    padding: 20px;
    /* 内边距，增加内容与边框的距离 */
    background-color: #fff;
    /* 背景色设置为白色，简洁明亮 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* 轻微的阴影效果，增加立体感 */
    font-family: Arial, sans-serif;
    /* 使用通用字体，保证兼容性和可读性 */
}

h2 {
    color: #333;
    /* 标题颜色深一些，增强对比度 */
    border-bottom: 2px solid #eee;
    /* 标题下方的轻微分割线 */
    padding-bottom: 10px;
    /* 分割线与文字之间的距离 */
}

.content {
    margin-top: 20px;
    /* 与标题部分的间距 */
    line-height: 1.6;
    /* 行高，提高阅读体验 */
}

.content span {
    font-weight: bold;
    /* 加粗标签文字，明确区分 */
}

.content pre {
    background-color: #f6f8fa;
    /* 代码或内容块的背景色，与周围区分 */
    padding: 10px;
    /* 内边距，增加可读性 */
    border-radius: 5px;
    /* 轻微圆角，美观 */
    white-space: pre-wrap;
    /* 保留空白符和换行，同时允许自动换行 */
    word-wrap: break-word;
    /* 长单词或URL自动换行 */
}

.tag {
    margin-top: 20px;
    /* 标签部分与内容部分的间距 */
}

.tag span {
    margin-right: 5px;
    /* 标签之间的间隔 */
}
.button{
    margin-top: 20px;
    /* 与标签部分的间距 */
}
</style>
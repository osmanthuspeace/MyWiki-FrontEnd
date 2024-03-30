<template>
  <div class="container">
    <h2>Entry List</h2>
    <div class="search">
      <el-input v-model="input" placeholder="Please input Title" class="input-with-select" clearable>
        <template #append>
          <el-button :icon="Search" @click="SearchEntry" />
        </template>
      </el-input>
      <el-input v-model="inputTag" placeholder="Please input Tag" class="input-with-select" clearable>
        <template #append>
          <el-button :icon="Search" @click="SearchTag" />
        </template>
      </el-input>
    </div>
    <div class="entry-container">
      <div class="entry" v-for="entry in entries" :key="entry.id" @click="toDetail(entry)">
        <img src="../../public/fox.jpg" alt="this is the picture of the entry" class="img">
        <div>{{ entry.title }}</div>
        <ul>
          <el-tag v-for="tag in entry.tagNames" :key="tag.id" class="tags">{{ tag }}</el-tag>
        </ul>
      </div>
    </div>
    <el-pagination style="justify-content: center;" v-model:current-page="currentPage" v-model:page-size="pageSize"
      :small=false layout="prev, pager, next, jumper" :total=entryNum @current-change="handleCurrentChange"
      :hide-on-single-page="true" />
  </div>
</template>

<script setup>
import router from '@/router';
import axios from 'axios';
import { onMounted, ref, nextTick } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const entries = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const input = ref('');
const inputTag = ref('')
const entryNum = ref(100);

// 加载词条数据的函数
const loadEntries = () => {
  axios.get('http://localhost:5054/api/Entry/GetEntries?page=' + currentPage.value + '&pageSize=' + pageSize.value)
    .then(response => {
      // console.log(response.data);
      entries.value = response.data;
    })
    .catch(error => {
      if (error.response.code === 404)
        router.push('/error');
      ElMessage.error(error.response.data);
    });
};

const SearchEntry = () => {
  if (input.value === '') {
    window.location.reload();
  }
  axios.get('http://localhost:5054/api/Entry/GetEntriesByTitle/' + input.value + '?page=' + currentPage.value + '&pageSize=' + pageSize.value)
    .then(response => {
      // console.log(response.data);
      entries.value = response.data;
      entryNum.value = response.data.length;
    })
    .catch(error => {
      const errorData = error.response.data;
      ElMessage.error(errorData);
    });
};

const SearchTag = () => {
  if (inputTag.value === '') {
    window.location.reload();
  }
  axios.get('http://localhost:5054/api/Entry/GetEntriesByTags?tagNames=' + inputTag.value + '&page=' + currentPage.value + '&pageSize=' + pageSize.value)
    .then(response => {
      console.log(response.data);
      entries.value = response.data;
      entryNum.value = response.data.length;
    })
    .catch(error => {
      const errorData = error.response.data;
      ElMessage.error(errorData);
    });
};

function handleCurrentChange(val) {
  currentPage.value = val;
  loadEntries();
}

function toDetail(entry) {
  const id = entry.id;
  router.push(`/entry/${id}`);
}

onMounted(async () => {
  await nextTick(); // 确保DOM更新完成

  let container = document.querySelector('.container');
  if (container) {
    let pageHeight = container.clientHeight;
    // console.log(pageHeight);
    pageSize.value = Math.floor((pageHeight * 2) / (200)) * 3;

    axios.get('/Entry/GetEntryTotal').then(response => {
      entryNum.value = response.data;
    });
    loadEntries();
  }
});
</script>

<style scoped>
.container {
  max-width: 1200px;
  /* 最大宽度，确保内容在大屏幕上的可读性 */
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* 搜索区域样式 */
.search {
  display: flex;
  /* 使用Flex布局使输入框并排 */
  justify-content: space-around;
  /* 两个搜索框之间平均分布 */
  margin-bottom: 30px;
}

.input-with-select {
  flex-grow: 1;
  /* 让搜索框占据可用空间 */
  margin: 0 10px;
  /* 两个搜索框之间略有间距 */
}

/* 词条容器样式，网格布局 */
.entry-container {
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 30px;
}

/* 词条样式 */
.entry {
  cursor: pointer;
  border: 1px solid #eee;
  padding: 15px;
  border-radius: 5px;
  background-color: #fafafa;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  /* 平滑过渡效果 */
}

.entry:hover {
  transform: translateY(-5px);
  /* 鼠标悬停时轻微上浮 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
}

.img {
  width: 100%;
  /* 图片宽度自适应 */
  border-radius: 3px;
  /* 图片圆角 */
  margin-bottom: 10px;
  /* 与标题的间距 */
}

.tags {
  background-color: #eef;
  padding: 5px;
  border-radius: 3px;
  display: inline-block;
  /* 使标签内联显示 */
  margin: 2px;
  font-size: 0.8rem;
}

/* 分页器样式 */
.el-pagination {
  margin-top: 30px;
  /* 与词条内容的间距 */
  display: flex;
  /* 使用Flex布局 */
  justify-content: center;
  /* 分页器居中 */
}
</style>

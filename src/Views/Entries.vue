<template>
  <div class="container">
    <h2>Entry List</h2>
    <div class="search">
      <el-input v-model="input" placeholder="Please input" class="input-with-select" clearable>
        <template #prepend>
          <el-select v-model="select" placeholder="Select Tags" style="width: 115px">
            <el-option label="Restaurant" value="1" />
            <el-option label="Order No." value="2" />
            <el-option label="Tel" value="3" />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="SearchEntry" />
        </template>
      </el-input>
    </div>

    <div class="entry-container">
      <div class="entry" v-for="entry in entries" :key="entry.id" @click="toDetail(entry)">
        <img src="../../public/fox.jpg" alt="this is the picture of the entry" class="img">
        <div>{{ entry.title }}</div>
        <ul>
          <div v-for="tag in entry.tagNames" :key="tag.id" class="tags">{{ tag }}</div>
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
import { onMounted, ref } from 'vue';
import { Search } from '@element-plus/icons-vue'

const entries = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const select = ref('');
const input = ref('');
const entryNum = ref(100);

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + yourJWTToken;

// 加载词条数据的函数
const loadEntries = () => {
  axios.get('http://localhost:5054/api/Entry/GetEntries?page=' + currentPage.value + '&pageSize=' + pageSize.value)
    .then(response => {
      console.log(response.data);
      entries.value = response.data;
    })
    .catch(error => {
      router.push('/error');
      console.error('Error loading entries:', error);
    });
};
const SearchEntry = () => {
  if (input.value === '') {
    window.location.reload();
  }
  axios.get('http://localhost:5054/api/Entry/GetEntriesByTitle/' + input.value + '?page=' + currentPage.value + '&pageSize=' + pageSize.value)
    .then(response => {
      console.log(response.data);
      entries.value = response.data;
      entryNum.value = response.data.length;
    })
    .catch(error => {
      console.error('Error loading entries:', error);
    });
};
function handleCurrentChange(val) {
  currentPage.value = val;
  loadEntries();
}

// 截取字符串的方法
const truncateContent = (content) => {
  return content.length > 20 ? content.substring(0, 20) + '...' : content;
};


function toDetail(entry) {
  const id=entry.id;
  router.push(`/entry/${id}`);
}


onMounted(() => {
  let pageHeight = document.querySelector('.container').clientHeight;
  pageSize.value = Math.floor(pageHeight / 200) * 3;
  axios.get('/Entry/GetEntryTotal').then(response => {
    entryNum.value = response.data;
  });
  loadEntries(); // 页面加载后立即加载词条数据
});
</script>

<style scoped>
.container {
  background-color: aqua;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.entry-container {
  padding: 30px;
  display: grid;
  /* 使用Grid布局 */
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  /* 列宽自适应，最小150px */
  gap: 30px;
  /* 设置entry之间的间距 */
}

.entry {
  height: 200px;
  padding: 10px;
  border: 1px solid black;
  background-color: white;
  border-radius: 10px;
}

.entry:hover {
  box-shadow: 0 10px 30px #86c4f7;
  transform: scale(1.05);
  transition: all 0.3s;
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

.img {
  width: 100px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  transition: all 0.3s;
}

.search {
  width: 400px;
  margin-bottom: 20px;
}

.search .icon:hover {
  cursor: pointer;
}
</style>

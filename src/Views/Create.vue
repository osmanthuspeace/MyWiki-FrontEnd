<template>
    <div class="container">
        <h1>
            Create Page
        </h1>
        <el-form :model="form" label-width="120px">
            <el-form-item label="Title">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="Content">
                <el-input v-model="form.content" type="textarea" />
            </el-form-item>
            <el-form-item label="Tags">
                <el-select-v2 v-model="tags" filterable :options="options" placeholder="Please select" style="width: 240px"
                    multiple clearable collapse-tags collapse-tags-tooltip :max-collapse-tags="3" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button @click="back">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script setup>
import { reactive, defineProps, onMounted } from 'vue'
import { ref } from 'vue'
import request from '@/utils/request'
import router from '@/router';

const tags = ref([])
const options = ref([]);
const form = reactive({
    title: '',
    content: '',
})
const back = () => {
    router.push('/entries');
}

const onSubmit = () => {
    request.post('/Entry/PostEntry', {
        title: form.title,
        content: form.content,
        tagNames: tags.value
    }).then(response => {
        alert('Post successfully!')
        console.log(response.data);
        router.push('/entries');
    }).catch(error => {
        console.error('Error updating entry:', error);
    })
}

onMounted(() => {
    request.get('/Entry/GetTags')
        .then(response => {
            // console.log(response.data);
            options.value = response.data.map(tag => {
                return {
                    value: tag.tagName,
                    label: tag.tagName
                }
            });
        }).catch(error => {
            console.error('Error loading tags:', error);
        })
})
</script>

<style scoped>
.container {
    margin: 100px auto;
    padding-right: 100px;
    width: 600px;
}

h1 {
    margin-bottom: 20px;
}
</style>

<template>
    <div class="image-gallery">
        <div v-for="(image, index) in images" :key="index" class="image-wrapper">
            <img :src="'http://localhost:5054/' + image.displayUrl" :alt="image.alt" class="image-item"
                @click="toPicture(image.displayUrl)" />
        </div>
    </div>
</template>

<script setup>
import request from '@/utils/request';
import { ref } from 'vue';

const images = ref([]);
request.get('/Picture/GetPictures')
    .then(response => {
        // console.log(response.data);
        images.value = response.data;
    }).catch(error => {
        console.error('Error loading pictures:', error);
    })
const toPicture = (url) => {
    window.open('http://localhost:5054/' + url);
}
</script>

<style scoped>
.image-gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    padding: 20px;
}

.image-wrapper {
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 8px;
    transition: transform 0.2s ease;
}

.image-wrapper:hover {
    transform: scale(1.05);
}

.image-item {
    width: 100%;
    /* Adjust this value based on your requirements */
    height: auto;
    border-radius: 4px;
}
</style>
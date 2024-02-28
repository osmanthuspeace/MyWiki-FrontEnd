<template>
    <div class="container">
        <h1>Roles</h1>
        <div v-for="role in roles" :key="role.RoleId">
            <span class="roles">{{ tag.tagName }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const roles = ref([]);

</script>

<style scoped></style>

<template>
    <div class="container">
        <h1>Tags</h1>
        <div v-for="role in roles" :key="role.RoleId">
            <span class="roles">{{ tag.tagName }}</span>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped></style>

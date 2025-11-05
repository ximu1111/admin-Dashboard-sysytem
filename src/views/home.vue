<script setup lang="ts">
import vHeader from '@/components/header.vue'
import vSidebar from '@/components/sidebar.vue'
</script>
<template>
    <div class="wrapper">
        <v-header />
        <v-sidebar></v-sidebar>

    </div>
</template>
<style scoped>
.wrapper {
    height: 100vh;
    overflow: hidden;
}
</style>

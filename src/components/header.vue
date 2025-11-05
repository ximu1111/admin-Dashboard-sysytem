<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebar'
const sidebar = useSidebarStore()
const collapseChage = () => {
    sidebar.handleCollapse();
}
</script>
<template>
    <div class="header">
        <div class="header-left">
            <img class="logo" src="" alt="">
            <div class=""> </div>
            <div class="" @click="collapseChage">
                <el-icon v-if="sidebar.collapse">
                    <Expand />
                </el-icon>
                <el-icon v-else>
                    <Fold />
                </el-icon>
            </div>
        </div>
        <div class="header-right">

        </div>
    </div>
</template>
<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    color: var(--header-text-color);
    background-color: var(--header-bg-color);
    border-bottom: 1px solid #ddd;
}
</style>
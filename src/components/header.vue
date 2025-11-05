<script setup lang="ts">
import { onMounted } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { Expand, Fold } from '@element-plus/icons-vue'

//测边栏折叠
const sidebar = useSidebarStore()
const collapseChage = () => {
    sidebar.handleCollapse();
}

onMounted(() => {
    if (document.body.clientWidth < 1500) {
        collapseChage();
    }
});
</script>
<template>
    <div class="header">
        <div class="header-left">
            <img class="logo" src="" alt="">
            <div class=""> 后台管理系统</div>
            <div class="collapse-btn" @click="collapseChage">
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

.header-left {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 100%;
}

.collapse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    opacity: 0.8;
    font-size: 22px;
}
</style>
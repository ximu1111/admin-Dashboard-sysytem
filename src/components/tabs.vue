<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTabsStore } from '@/stores/tabs'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import type { TabPaneName } from 'element-plus'

const route = useRoute()
const tabsStore = useTabsStore()
const activePath = ref(route.fullPath)
let tabIndex = 2


const setTags = (route: any) => {
    const isExist = tabsStore.list.some((item) => {
        return item.path === route.fullPath
    })
    if (!isExist) {
        tabsStore.setTabItem({
            name: route.name,
            title: route.meta.title,
            path: route.fullPath
        })
    }
}
setTags(route)
onBeforeRouteUpdate((to) => {
    setTags(to)
})
</script>
<template>
    <div class="tabs-container">
        <el-tabs v-model="activePath" type="card" closable class="tabs" @tab-click="">
            <el-tab-pane v-for="item in tabsStore.list" :key="item.name" :label="item.title" :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <div>
            <el-dropdowm>

            </el-dropdowm>
        </div>
    </div>

</template>



<style lang="scss" scoped>
.tabs-container {
    position: relative;
    overflow: hidden;
    background: #fff;
    padding: 2px 120px 0 0;
}

.tabs {
    .el-tabs__header {
        margin-bottom: 0;
    }

    .el-tabs__nav {
        height: 28px;
    }

    .el-tabs__nav-next,
    .el-tabs__nav-prev {
        line-height: 32px;
    }

    &.el-tabs {
        --el-tabs-header-height: 28px;
    }
}

.Tabs-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 1px;
    text-align: center;
    width: 110px;
    height: 30px;
    background: #fff;
    box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1);
    z-index: 10;
}
</style>
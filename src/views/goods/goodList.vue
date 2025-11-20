<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { FormOptionList, FormOption } from '@/types/form-option'

import { Search } from '@element-plus/icons-vue'
import { labelInner } from 'echarts/types/src/label/labelStyle.js'

import tableSearch from '@/components/table-search.vue'
import tableCustom from '@/components/table-custom.vue'
const query = reactive({
    name: ''
})

const searchOpt = ref<FormOptionList[]>([
    { type:'input',label:'',prop:'name'}
])
const handleSearch = () => {}
</script>

<template>
    <div>
        <tableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    </div>
    <tableCustom/>
</template>

<style scoped></style>
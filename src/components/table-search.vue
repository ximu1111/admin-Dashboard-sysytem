<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'
import { type PropType, ref, type Prop } from 'vue'
import type { FromOptionList } from '@/types/form-option'

const props = defineProps({
    query: {
        type: Object,
        required: true
    },
    options: {
        type: Array as PropType<Array<FromOptionList>>,
        required: true
    },
    Search: {
        type: Function,
        default: () => { }
    }
})

const searchRef = ref<FormInstance>()
const resetForm = (formEl:FormInstance | undefined)=>{
    if(!formEl) return 
    formEl.resetFields()
    props.Search()
}
</script>

<template>
<div class="search-container">
    <el-form ref="searchRef" :model="query" :inline="true">
        <el-form-item>

        </el-form-item>

    </el-form>
</div>

</template>


<style scoped>
.search-container {
    padding: 20px 30px 0;
    background-color: #fff;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px
}
</style>
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'
import { type PropType, ref, type Prop } from 'vue'
import type { FormOptionList } from '@/types/form-option'

const props = defineProps({
    query: {
        type: Object,
        required: true
    },
    options: {
        type: Array as PropType<Array<FormOptionList>>,
        required: true
    },
    search: {
        type: Function,
        default: () => { }
    }
})

const searchRef = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    props.search()
}
</script>

<template>
    <div class="search-container">
        <el-form ref="searchRef" :model="query" :inline="true">
            <el-form-item :label="item.label" v-for="item in options" :prop="item.prop">

                <el-input v-if="item.type === 'input'" v-model="query[item.prop]" :disabled="item.disabled"
                    :placehold="item.placeholder" clearable></el-input>
                <el-select v-else-if="item.type === 'select'" v-model="query[item.prop]" :display="item.disabled"
                    :placeholder="item.placeholder" clearable></el-select>
                <el-date-picker v-else-if="item.type === 'date'" type="date" v-model="query[item.prop]"
                    :value-format="item.format"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" :icon="Search">搜索</el-button>
                <el-button :icon="Refresh" @click="resetForm(searchRef)">重置</el-button>
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
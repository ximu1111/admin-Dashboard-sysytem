<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { FormOptionList, FormOption } from '@/types/form-option'
import type { TableItem } from '@/types/table'
import { fetchData } from '@/api/index'

import { CirclePlusFilled, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import tableSearch from '@/components/table-search.vue'
import TableCustom from '@/components/table-custom.vue'
import VUeForm from '@/components/form.vue'


const query = reactive({
    name: ''
})

const searchOpt = ref<FormOptionList[]>([
    { type: 'input', label: '', prop: 'name' }
])


const handleSearch = () => { }
const columns = ref([
    { type: 'selection' },
    { type: 'index', label: '序号', width: 55, align: 'center' },
    { type: 'image', label: '商品图片', width: 105, align: 'center' },
    { prop: 'category', label: '商品分类', width: 115, align: 'center' },
    { prop: 'name', label: '商品名' },
    { prop: 'money', label: '商品价格', width: 175, align: 'center' },
    { prop: 'state', label: '商品状态', width: 175, align: 'center' },
    { prop: 'operator', label: '操作', width: 250 }
])

const page = reactive({
    index: 1,
    size: 10,
    total: 200
})

const tableData = ref([])

const getData = async () => {
    const res = await fetchData()
    tableData.value = res.data.list
}
getData()

const changePage = (val: number) => {
    page.index = val
    getData()
}

let options = ref<FormOption>({
    labelWidth: '100px',
    span: 24,
    list: [
        { type: 'input', label: '用户名', prop: 'name', required: true },
        { type: 'number', label: '账户余额', prop: 'money', required: true },
        { type: 'switch', activeText: '正常', inactiveText: '异常', label: '账户状态', prop: 'state', required: true },
        { type: 'upload', label: '头像', prop: 'thumb', required: true },
    ],
})

const visible = ref(false)
const isEdit = ref(false)
const rowData = ref({})
const formVisible = ref(false)
const currentRowData = ref({})

const handleEdit = (row: TableItem) => {
    rowData.value = { ...row }
    isEdit.value = true
    visible.value = true
}

const updateData = () => {
    closeDialog()
    getData()
}

const closeDialog = () => {
    visible.value = false
    isEdit.value = false
}

const visible1 = ref(false)
const viewData = ref({
    row: {},
    list: [] as {
        prop: string
        label: string
    }[]
})

const handleView = (row: TableItem) => {
    viewData.value.row = { ...row }
    viewData.value.list = [
        {
            prop: 'id',
            label: '用户ID'
        },
        {
            prop: 'image',
            label: '商品图片',
        },
        {
            prop: 'name',
            label: '商品名'
        },
        {
            prop: 'money',
            label: '商品价格'
        },
        {
            prop: 'state',
            label: '账户状态',
        },
        {
            prop: 'thumb',
            label: '头像'
        }

    ]
    visible.value = true
}

const handleDelete = (row: TableItem) => {
    ElMessage.success('删除成功')
}
const handleFormClose = () => {
    formVisible.value = false
    currentRowData.value = {}
}
const handleFormSubmit = (formData: any) => {
    getData()
}
const handleAdd = ()=>{
    isEdit.value = false
    currentRowData.value = {}
    formVisible.value = true
}
</script>

<template>
    <div>
        <tableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    </div>
    <div class="container">
        <TableCustom :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
            :delFunc="handleDelete" :editFunc="handleEdit" :refresh="getData" :currentPage="page.index"
            :changePage="changePage">
            <template #toolbarBtn>
                <el-button type="warning" :icon="CirclePlusFilled" @click="handleAdd">新增</el-button>
            </template>
            <template #money="{ rows }">
                ￥{{ rows.money }}
            </template>
            <template #image="{ rows }">
                <el-image class="table-td-thumb" :src="rows.iamge" :z-index="10"></el-image>
            </template>
            <template #thumb="{ rows }">
                <el-image class="table-td-thumb" :src="rows.thumb" :z-index="10" :preview-src-list="[rows.thumb]"
                    preview-teleported>
                </el-image>
            </template>
            <template #state="{ rows }">
                <el-tag :type="rows.state ? 'success' : 'danger'">
                    {{ rows.state ? '正常' : '异常' }}
                </el-tag>
            </template>
        </TableCustom>
    </div>
    <VUeForm v-model:visible="formVisible" :is-edit="isEdit" :row-data="currentRowData"
        @submit="handleFormSubmit" @close="handleFormClose">
    </VUeForm>
</template>

<style scoped>
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
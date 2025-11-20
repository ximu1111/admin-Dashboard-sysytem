<script setup lang="ts">
import { toRefs, type PropType, ref } from 'vue'
import { ElMessageBox } from 'element-plus'

const props = defineProps({
    // 表格相关
    tableData: {
        type: Array,
        default: []
    },
    columns: {
        type: Array as PropType<any[]>,
        default: []
    },
    rowKey: {
        type: String,
        default: 'id'
    },
    hasToolbar: {
        type: Boolean,
        default: true
    },
    //  分页相关
    hasPagination: {
        type: Boolean,
        default: true
    },
    total: {
        type: Number,
        default: 0
    },
    currentPage: {
        type: Number,
        default: 1
    },
    pageSize: {
        type: Number,
        default: 10
    },

    layout: {
        type: String,
        default: 'total, prev, pager, next'
    },
    delFunc: {
        type: Function,
        default: () => { }
    },
    viewFunc: {
        type: Function,
        default: () => { }
    },
    editFunc: {
        type: Function,
        default: () => { }
    },
    delSelection: {
        type: Function,
        default: () => { }
    },
    refresh: {
        type: Function,
        default: () => { }
    },
    changePage: {
        type: Function,
        default: () => { }
    }
})

let {
    tableData,
    columns,
    rowKey,
    hasToolbar,
    hasPagination,
    total,
    currentPage,
    pageSize,
    layout,
} = toRefs(props)

columns.value.forEach((item) => {
    if (item.visible === undefined) {
        item.visible = true
    }
})

const multipleSelection = ref<any[]>([])
const handleSelectionChange = (selection: any[]) => {
    multipleSelection.value = selection
}

const handleCurrentChange = (val: number) => {
    props.changePage(val)
}
const handleDelete = (row: any) => {
    ElMessageBox.confirm('确定要删除吗', '提示', {
        type: 'warning'
    }).then(async () => {
        props.delFunc(row)
    }).catch(() => { })
}

const getIndex = (index: number) => {
    return index + 1 + (currentPage.value - 1) * pageSize.value
}
</script>

<template>
    <div>
        <div class="table-ttolar" v-if="hasToolbar">
            <div class="table-toolar-left">
                <slot name="toolbarBtn">
                </slot>
            </div>
        </div>
        <div class="table-toolbar-right flex-center">
            <template v-if="multipleSelection.length > 0">
                <el-tooltip effect="dark" content="删除选中" placement="top">
                    <el-icon class="columns-setting-icon" @click="delSelection(multipleSelection)">
                        <Delete />
                    </el-icon>
                </el-tooltip>
                <el-divider direction="vertival" />
            </template>
            <el-tooltip>

            </el-tooltip>
        </div>
        <el-table></el-table>
    </div>

</template>

<style scoped>
.table-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;
}

.columns-setting-icon {
    display: block;
    font-size: 18px;
    cursor: pointer;
    color: #676767;
}
</style>
<style>
.table-header .cell {
    color: #333;
}
</style>
<script setup lang="ts">
import { ref } from 'vue'

import TableCustom from '@/components/table-custom.vue'


const columns = ref([
    { type: 'selection' },
    { type: 'index', label: '序号', width: '55', align: 'center' },
    { prop: 'avater', label: '会员头像', width: '115' },
    { prop: 'nickname', label: '会员昵称', align: 'center' },
    { prop: 'point', label: '积分', align: 'center', width: '115' },
    { label: '操作', width: '300' }
])
</script>

<template>
    <div class="container">
        <TableCustom :columns="columns">

        </TableCustom>
    </div>

</template>

<style scoped></style>
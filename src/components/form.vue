<script setup lang="ts" name="form">
import { reactive, ref } from 'vue';
import type { UploadProps, UploadUserFile, FormInstance } from 'element-plus'
import { Plus } from "@element-plus/icons-vue"
import { ElMessage } from 'element-plus'

interface Props {
    visible: boolean,
    isEdit?: boolean,
    rowData?: any
}

const props = withDefaults(defineProps<Props>(), {
    visible: false,
    isEdit: false,
    rowData: () => ({})
})

const emit = defineEmits<{
    'update:visible': [value: boolean],
    'submit': [FormData: any],
    'close': []
}>()

const formRef = ref<FormInstance>()
const form = reactive({
    index: '',
    image: '',
    name: '',
    money: '',
    category: ''
})
const submit = () => {

}


const filelist = ref<UploadUserFile[]>([

])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onRemove'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}

const resetForm = () => {
    formRef.value?.resetFields()
    ElMessage.success('表单重置')
}

const closeDiaslog = () => {
    emit('update:visible', false)
    emit('close')
    resetForm()
}

defineExpose({
    resetForm
})
</script>

<template>
    <div class="container">
        <el-dialog :model-value="visible" :title="isEdit ? '编辑商品' : '新增商品'" @close="closeDiaslog"
            @update:model-value="$emit('update:visible', $event)" width="600px">
            <el-form :model="form" label-width="auto" style="max-width: 600px;" ref="formRef">

                <el-form-item label="商品名称">
                    <el-input v-model="form.name" />
                </el-form-item>

                <el-form-item label="商品分类">
                    <el-select v-model="form.category">
                        <el-option value="category1" label="Zone one" />
                    </el-select>
                </el-form-item>

                <el-form-item label="商品价格" type="number">
                    <el-input v-model="form.money" value=""></el-input>
                </el-form-item>

                <el-form-item label="上传图片">
                    <el-upload v-model:file-list="filelist" action="" :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">提交</el-button>
                    <el-button type="" @click="resetForm"> 重置</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>

</template>

<style scoped></style>

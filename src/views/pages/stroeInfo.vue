<script setup lang="ts">
import { ref } from 'vue'
import logo from '../../assets/img/logo.png'
import { ElMessage } from 'element-plus'
import { Picture, Plus, DocumentRemove } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

interface StoreInfo {
    name: string;
    logo: string;
    description: string;
    phone: string;
    address: string;
    license: string | null;
    email: string;
}
const editMode = ref(false)
const originalStoreInfo = ref(null)
const storeInfo = ref<StoreInfo>({
    name: '我的小店',
    logo: logo,
    description: '一家专注于售卖新鲜好物的社区小店',
    phone: '130-0000-0000',
    address: '广东省广州市',
    license: null,
    email: 'infodashboard@oo.com'

})

const handleLogoSuccess = (response: any, file: any) => {
    const reader = new FileReader()
    reader.onload = (event: any) => {
        storeInfo.value.logo = event.target.result
    }
    reader.readAsDataURL(file.raw)
    ElMessage.success('Logo上传成功')
}
const handleLicenseSuccess = (response: any, file: any) => {
    const reader = new FileReader()
    reader.onload = (event: any) => {
        storeInfo.value.license = event.target.result
    }

}
const beforeUpload = (file: any) => {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isImage) {
        ElMessage.error('只能上传jpeg,png,或者gif类型的图片')
        return false
    }
    if (!isLt5M) {
        ElMessage.error('只能上传大小小于5Mb的图片')
        return false
    }
    return true
}
const handleLicenseRemove = () => {
    storeInfo.value.license = null
}
const toggleEditMode = () => {
    if (!editMode.value) {
        originalStoreInfo.value = JSON.parse(JSON.stringify(storeInfo.value))
    }
    else {
        storeInfo.value = JSON.parse(JSON.stringify(originalStoreInfo.value))
    }
    editMode.value = !editMode.value
}
const saveStoreInfo = () => {
    editMode.value = !editMode.value
}
const uploadLogo = ref<UploadProps>()
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
</script>

<template>
    <div>
        <el-card>
            <template #header>
                <span style="font-weight: 500;">我的店铺信息</span>
                <el-button type="primary" style="float: right; padding:0 15px;" @click="toggleEditMode">
                    {{ editMode ? '取消' : '编辑' }}
                </el-button>
            </template>
            <div>
                <div class="info-section">
                    <h3 class="info-section-title">基本信息</h3>
                    <div class="info-row">
                        <div class="info-label">店铺名称</div>
                        <div class="info-content">
                            <el-input v-if="editMode" v-model="storeInfo.name"></el-input>
                            <span v-else>{{ storeInfo.name }}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">店铺logo</div>
                        <div class="info-content">
                            <div v-if="editMode">
                                <el-upload class="logo-upload" :on-success="handleLogoSuccess"
                                    :before-upload="beforeUpload" accept=".jpg,.jpeg,.png,.gif">
                                    <div v-if="storeInfo.logo" class="logo-preview">
                                        <el-image :src="storeInfo.logo" class="store-logo" fit="cover">
                                            <template #error>
                                                <div class="image-slot">
                                                    <el-icon>
                                                        <Picture />
                                                    </el-icon>
                                                </div>
                                            </template>
                                        </el-image>
                                        <div class="logo-overlay">
                                            <span class="logo-text">点击更换logo</span>
                                        </div>
                                    </div>
                                    <div v-else class="logo-upload-placeholder">
                                        <el-icon class="upload-icon">
                                            <Plus/>
                                        </el-icon>
                                        <div class="upload-text">点击上传logo</div>
                                    </div>
                                </el-upload>
                            </div>
                            <div v-else>
                                <el-image :src="storeInfo.logo" class="store-logo" fit="cover">
                                    <template #error>
                                        <div class="image-slot">
                                            <el-icon><Picture/></el-icon>
                                            <span>logo加载失败</span>
                                        </div>
                                    </template>
                                </el-image>
                            </div>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">店铺简介</div>
                        <div class="info-content">
                            <el-input v-if="editMode" v-model="storeInfo.description"></el-input>
                            <span v-else>{{ storeInfo.description }}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">店铺地址</div>
                        <div class="info-content">
                            <el-input v-if="editMode" v-model="storeInfo.address"></el-input>
                            <span v-else>{{ storeInfo.address }}</span>
                        </div>
                    </div>

                </div>
                <div class="info-section">
                    <h3 class="info-section-title">联系信息</h3>
                    <div class="info-row">
                        <div class="info-label">联系电话</div>
                        <div class="info-content">
                            <el-input v-if="editMode" v-model="storeInfo.phone"></el-input>
                            <span v-else>{{ storeInfo.phone }}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">电子邮箱</div>
                        <div class="info-content">

                            <el-input v-if="editMode" v-model="storeInfo.email"></el-input>
                            <span v-else>{{ storeInfo.email }}</span>
                        </div>
                    </div>
                </div>
                <div class="info-section">
                    <h3 class="info-section-title">资质信息</h3>
                    <div class="info-row">
                        <div class="info-label">营业执照 </div>
                        <div class="info-content">
                            <div v-if="editMode">
                                <el-upload class="license-uploader" :show-file-list="false"
                                    :on-success="handleLicenseSuccess" :before-upload="beforeUpload"
                                    :on-remove="handleLicenseRemove" accept=".jpg,.jpeg,.png,.gif">
                                    <div v-if="storeInfo.license">
                                        <el-image :src="storeInfo.license" class="license-image"
                                            :preview-src-list="[storeInfo.license]" fit="cover">
                                            <template #error>
                                                <div class="image-slot">
                                                    <el-icon>
                                                        <Picture />
                                                    </el-icon>
                                                </div>
                                            </template>
                                        </el-image>
                                        <div class="license-actions">
                                            <el-button type="primary" text>重新上传</el-button>
                                            <el-button type="danger" text
                                                @click.stop="handleLicenseRemove">删除</el-button>
                                        </div>
                                    </div>
                                    <div v-else class="upload-placeholder">
                                        <el-icon class="upload-icon">
                                            <Plus />
                                        </el-icon>
                                        <div class="upload-text">点击上传营业执照</div>
                                        <div class="upload-tip">支持 JPG、PNG、GIF，大小不超过 5MB</div>
                                    </div>

                                </el-upload>
                            </div>
                            <div v-else>
                                <div v-if="storeInfo.license" class="license-preview">
                                    <el-image :src="storeInfo.license" class="license-image"
                                        :preview-src-list="[storeInfo.license]" fit="cover">
                                        <template #error>
                                            <div class="image-slot">
                                                <el-icon>
                                                    <Picture />
                                                </el-icon>
                                                <span>图片加载失败</span>
                                            </div>
                                        </template>
                                    </el-image>
                                    <div class="license-status">已上传</div>
                                </div>
                                <div v-else class="no-license">
                                    <el-icon class="no-data-icon">
                                        <DocumentRemove />
                                    </el-icon>
                                    <span>未上传营业执照</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="action-buttons" v-if="editMode" @click="saveStoreInfo">
                    <el-button type='primary'>保存</el-button>
                </div>
            </div>
        </el-card>
    </div>

</template>

<style scoped>
.info-section {
    margin-bottom: 25px;
}

.info-section-title {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
    color: #303133;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
}

.info-row {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
}

.info-label {
    width: 120px;
    font-weight: 500;
    color: #606266;
}

.info-content {
    flex: 1;
    color: #909399;
}

.action-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.store-logo {
    width: 120px;
    height: 120px;
    border-radius: 4px;
    object-fit: cover;
    border: 1px solid #ebeef5;
}

.license-upload-container {
    width: 100%;
}

.license-uploader {
    width: 100%;
}

.license-preview {
    position: relative;
    width: 200px;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    overflow: hidden;
}

.license-image {
    width: 100%;
    height: 150px;
    display: block;
}

.license-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    padding: 8px;
    display: flex;
    justify-content: center;
    gap: 10px;
}

.upload-placeholder {
    width: 200px;
    height: 150px;
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.3s;
}

.upload-placeholder:hover {
    border-color: #409EFF;
}

.upload-icon {
    font-size: 40px;
    color: #8c939d;
    margin-bottom: 8px;
}

.upload-text {
    font-size: 14px;
    color: #606266;
    margin-bottom: 4px;
}

.upload-tip {
    font-size: 12px;
    color: #909399;
}

.license-display {
    width: 100%;
}

.no-license {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #909399;
    padding: 10px 0;
}

.no-data-icon {
    font-size: 18px;
}

.license-status {
    position: absolute;
    top: 8px;
    right: 8px;
    background: #67c23a;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
}

.image-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
}

/* Logo上传样式 */
.logo-uploader {
    width: 120px;
}

.logo-preview {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #ebeef5;
}

.logo-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.logo-preview:hover .logo-overlay {
    opacity: 1;
}

.logo-text {
    color: white;
    font-size: 12px;
    text-align: center;
}

.logo-upload-placeholder {
    width: 120px;
    height: 120px;
    border: 2px dashed #d9d9d9;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.3s;
}

.logo-upload-placeholder:hover {
    border-color: #409EFF;
}

.upload-icon {
    font-size: 24px;
    color: #8c939d;
    margin-bottom: 8px;
}

.upload-text {
    font-size: 12px;
    color: #606266;
}

</style>
<script setup lang="ts">
import { ref } from 'vue'
import logo from '../../assets/img/logo.png'

const editMode = ref(false)
const originalStoreInfo = ref(null)
const storeInfo = ref({
    name: '我的小店',
    logo: logo,
    description: '一家专注于售卖新鲜好物的社区小店',

})
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
                        <div calss="info-content">
                            <el-input v-if="editMode" v-model="storeInfo.name"></el-input>
                            <span v-else>{{ storeInfo.name }}</span>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">店铺logo</div>
                        <div calss="store-logo">
                            <el-upload v-if="editMode">
                                <el-icon>
                                    <Plus />
                                </el-icon>
                            </el-upload>
                            <el-image v-else :src="storeInfo.logo"></el-image>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">店铺简介</div>
                        <div calss="info-content">
                            <el-input v-if="editMode" v-model="storeInfo.description"></el-input>
                            <span v-else>{{ storeInfo.description }}</span>
                        </div>
                    </div>
                    <div class="action-buttons" v-if="editMode" @click="saveStoreInfo">
                        <el-button type='primary'>保存</el-button>
                    </div>
                </div>
                <div class="info-section">
                    <h3 class="info-section-title">销售信息</h3>
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
</style>
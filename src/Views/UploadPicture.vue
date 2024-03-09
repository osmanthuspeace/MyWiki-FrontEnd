<template>
    <el-upload
        class="upload-demo"
        drag
        :action="uploadUrl"
        :on-success="handleSuccess"
        :on-error="handleError"
        multiple
        name="pic">
        <i class="el-icon-upload"></i>
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <div slot="tip" class="el-upload__tip">
            jpg/png files with a size less than 500kb
        </div>
    </el-upload>
</template>

<script setup>
const uploadUrl= "http://localhost:5054/api/Picture/UploadPicture"
function handleSuccess(response, file, fileList) {
    // 处理上传成功的响应
    console.log("Upload success:", response);
}
function handleError(err, file, fileList) {
    // 处理上传失败的情况
    console.error("Upload error:", err);
}   

</script>
<style scoped>
</style>

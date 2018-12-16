<template>
  <div class="warp-main" style="padding: 10px;">
    <p>企业认证</p>

    <el-upload class="avatar-uploader" name="avatar" action="/upload" :data="uploadData" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button type="primary" icon="el-icon-edit">认证</el-button>
  </div>
</template>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script>
  export default {
    data(){
      return {
        imageUrl: '',
        uploadData: { //上传文件时要上传的额外参数
          userId: 'U0001',
          userName: 'admin'
        }
      };
    },
    methods: {
      handleAvatarSuccess(res, file){
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isJPG){
          this.$message.error('上传图片只能是jpg格式！');
        }
        if(!isLt2M){
          this.$message.error('上传图片不能超过2M');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

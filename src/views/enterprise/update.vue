<template>
  <div class="warp-main">
    <div>
      <el-button @click="startHacking">Start</el-button>
    </div>
    <el-button type="primary" icon="el-icon-edit">保存</el-button>
  </div>
</template>
<script>
  export default{
    data (){
      return {
        message: 'hello vue'
      };
    },
    methods: {
      startHacking () {
        this.$notify({
          title: 'It works!',
          type: 'success',
          message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
          duration: 5000
        })
      }
    }
  }
</script>

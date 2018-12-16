<template>
  <div class="warp-main">
    <el-button type="primary" icon="el-icon-edit" @click="clickShow">客户查看</el-button>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        message: 'Hello Vue'
      };
    },
    methods: {
      clickShow: function(){
        alert('显示');
      }
    }
  }
</script>

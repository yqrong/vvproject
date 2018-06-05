<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24"><router-view name="top"></router-view></el-col>
    <!--内容-->
    <router-view name="main"></router-view>
  </el-row>
</template>
<script>
  export default {
    name: 'home',
    data () {
      return {
        loading: false
      }
    }
  }
</script>

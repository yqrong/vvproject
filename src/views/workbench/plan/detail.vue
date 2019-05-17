<template>
  <div class="list-content">
    <h3>计划详情</h3>
    <ul>
      <li><span>计划编号:</span><div>{{detail.pNum}}</div></li>
      <li><span>计划名称:</span><div>{{detail.name}}</div></li>
      <li><span>计划内容:</span><div>{{detail.content}}</div></li>
      <li><span>开始时间:</span><div>{{detail.startTime}}</div></li>
      <li><span>完成时间:</span><div>{{detail.finishTime}}</div></li>
      <li><span>计划备注:</span><div>{{detail.remark}}</div></li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      detail: {// 详情
        type: Object,
        default: null
      }
    },
    data() {
      return {
        loading: false,
      }
    },
    methods: {}
  }
</script>
<style lang="scss" scoped>
  .list-content {
    h3 {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    ul {
      padding: 10px;
      li {
        position: relative;
        line-height: 40px;
        min-height: 40px;
        span {
          position: absolute;
          left: 0;
          display: inline-block;
          width: 90px;
          color: #999;
        }
        & > div {
          margin-left: 90px;
        }
      }
    }
  }
</style>

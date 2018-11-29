<template>
  <div class="list-content">
    <h3>任务详情</h3>
    <ul>
      <li><span>任务编号:</span><div>{{detail.number}}</div></li>
      <li><span>任务类型:</span><div>{{detail.type}}</div></li>
      <li><span>任务内容:</span><div>{{detail.content | contentFilter}}</div></li>
      <li><span>任务备注:</span><div>{{detail.remark}}</div></li>
      <li><span>创建日期:</span><div>{{detail.createTime | formatDateTime}}</div></li>
      <li><span>执行日期:</span><div>{{detail.activeTime | formatDateTime}}</div></li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      id: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        loading: false,
        detail: null, // 详情
      }
    },
    created() {
      this.initInfo();
    },
    methods: {
      initInfo() {
        this.loading = true;
        console.info(this.id);
        // 查询详情
        // ...
        this.detail = {
          id: 1,
          number: 'No.00001',
          type: '接收任务',
          content: '1',
          remark: '任务备注。。。',
          createTime: 1540560471000,
          activeTime: 1540890471000,
        };
        this.loading = false;
      }
    },
    filters: {
      contentFilter: function (value) {
        if (!value) return ''
        if (value == '1') return '接乘客'
        return '派车辆';
      }
    }
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

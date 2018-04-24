<template>
  <div>
    <p>行程计划</p>
    <el-button type="primary" icon="el-icon-edit" @click="openMsg">消息提示</el-button>
    <el-col :span="24">
      <el-table :data="infoData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="info-table-expand">
              <el-form-item label="计划编号：">
                <span>{{props.row.id}}</span>
              </el-form-item>
              <el-form-item label="计划名称：">
                <span>{{props.row.name}}</span>
              </el-form-item>
              <el-form-item label="计划内容：">
                <span>{{props.row.content}}</span>
              </el-form-item>
              <el-form-item label="开始时间：">
                <span>{{props.row.startTime}}</span>
              </el-form-item>
              <el-form-item label="完成时间：">
                <span>{{props.row.finishTime}}</span>
              </el-form-item>
              <el-form-item label="备注：">
                <span>{{props.row.remark}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="计划编号" prop="id"></el-table-column>
        <el-table-column label="计划名称" prop="name"></el-table-column>
        <el-table-column label="计划内容" prop="content"></el-table-column>
      </el-table>
    </el-col>
  </div>
</template>
<style>
  .info-table-expand {
    font-size: 0;
  }
  .info-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .info-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<script>
  export default {
    name: 'plan',
    data (){
      return {
        infoData: [{
          id: 'P0001',
          name: '计划A',
          content: '计划内容',
          startTime: '2018-04-20 08:00:00',
          finishTime: '2018-04-20 09:00:00',
          remark: '备注内容'
        },
          {
            id: 'P0002',
            name: '计划B',
            content: '计划内容',
            startTime: '2018-04-19 08:00:00',
            finishTime: '2018-04-19 12:00:00',
            remark: '备注内容'
          },
          {
            id: 'P0003',
            name: '计划C',
            content: '计划内容',
            startTime: '2018-04-18 08:00:00',
            finishTime: '2018-04-18 09:00:00',
            remark: '备注内容'
          },
          {
            id: 'P0004',
            name: '计划D',
            content: '计划内容',
            startTime: '2018-04-17 08:00:00',
            finishTime: '2018-04-17 11:00:00',
            remark: '备注内容'
          },
          {
            id: 'P0005',
            name: '计划E',
            content: '计划内容',
            startTime: '2018-04-16 08:00:00',
            finishTime: '2018-04-16 23:00:00',
            remark: '备注内容'
          }]
      }
    },
    methods: {
      openMsg() {
        this.$message({
          showClose: true,
          message: '这是一条消息提示',
          type: 'success'
        });
      }
    }
  }
</script>

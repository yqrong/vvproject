<template>
  <div>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.number" placeholder="请输入任务编号" auto-complete="off" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" @click="showAddDialog">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--表格数据-->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="mId" v-if="idShow" label="任务ID"></el-table-column>
        <el-table-column prop="mNumber" label="任务编号" width="180" sortable></el-table-column>
        <el-table-column prop="mType" label="任务类型" width="180"></el-table-column>
        <el-table-column prop="mContent" label="任务内容" show-overflow-tooltip></el-table-column>
        <el-table-column prop="eRemark" label="备注" width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" width="180"></el-table-column>
        <el-table-column prop="updateTime" label="更新日期" width="180"></el-table-column>
        <el-table-column prop="recordStatus" label="企业状态" width="180"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="10"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-col>

    <el-dialog title="任务添加" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="dialogAddVisible" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="任务编号：" :label-width="formLabelWidth">
          <el-input v-model="form.number" placeholder="请选择任务类型" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="任务类型：" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择任务类型">
            <el-option label="接收订单" value="receive"></el-option>
            <el-option label="转发订单" value="forward"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="任务内容：" :label-width="formLabelWidth">
          <el-radio-group v-model="form.content">
            <el-radio label="1">接乘客</el-radio>
            <el-radio label="2">派车辆</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="任务备注：" :label-width="formLabelWidth">
          <el-input v-model="form.remark" type="textarea" placeholder="请填写任务备注"></el-input>
        </el-form-item>
        <el-form-item label="创建日期：" :label-width="formLabelWidth">
          <el-date-picker v-model="form.createTime" type="date" placeholder="请选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogAddVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editFormSubmit">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    name: 'mission',
    data: function(){
      return {
        loading: false,
        radio: '1',
        idShow: false,
        keyword: "集团",
        total: 2,
        currentPage: 1,
        pageSize: 10,
        tableData: [{
          mId: 1,
          mNumber: '10001',
          mType: '接收订单',
          mContent: '接乘客',
          eRemark: '无',
          createTime: '2017-03-27',
          updateTime: '2016-03-27',
          recordStatus: '1'
        },
          {
            mId: 2,
            mNumber: '10002',
            mType: '转发订单',
            mContent: '接乘客',
            eRemark: '无',
            createTime: '2017-03-27',
            updateTime: '2016-03-27',
            recordStatus: '1'
          }],
        form: {
          number: '',
          type: '',
          content: '1',
          remark: '',
          createTime: '',
        },
        formLabelWidth: '120px',
        dialogAddVisible: false,
        filters: {
          number: ''
        }
      };
    },
    methods: {
      handleSearch(){
        console.info(this.filters.number);
      },
      handleDetail(index, row) {
        console.log(index, row);
        console.log(row.mId);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val){
//        this.pageSize = val;
//        this.currentPage = 1;
      },
      handleCurrentChange(val){
//        this.currentPage = val;
      },
      showAddDialog(){
        this.dialogAddVisible = true;
      },
      handleClose(done){  //关闭弹窗
        done();
      }
    }
  }
</script>

<template>
  <div class="warp-main">
    <el-row v-loading="loading" element-loading-text="拼命加载中">
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.number" placeholder="请输入任务编号" auto-complete="off" @keyup.enter.native="handleSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item class="pull-right">
            <el-button type="primary" size="medium" @click="showAddDialog" icon="el-icon-plus">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--表格数据-->
      <el-col class="table-wrapper">
        <el-table :data="tableData" stripe style="width: 100%" @row-click="handleDetail">
          <el-table-column prop="mId" v-if="idShow" label="任务ID"></el-table-column>
          <el-table-column prop="mNumber" label="任务编号" sortable></el-table-column>
          <el-table-column prop="mType" label="任务类型"></el-table-column>
          <el-table-column prop="mContent" label="任务内容"></el-table-column>
          <el-table-column prop="eRemark" label="任务备注" show-overflow-tooltip></el-table-column>
          <el-table-column prop="createTime" :formatter="dateFormatter" label="创建日期"></el-table-column>
          <el-table-column prop="activeTime" :formatter="activeTateFormatter" label="执行日期"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="toolbar">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <!--添加-->
    <mission-add ref="addMission" v-if="addVisible" :visible.sync="addVisible"></mission-add>
    <!--详情-->
    <div class="modal-mask" v-if="maskVisible" @click="cancelVisible"></div>
    <transition name="slide-fade">
      <div class="detail-box" v-if="detailVisible">
        <mission-detail ref="detailMission" :id="detailId"></mission-detail>
      </div>
    </transition>
  </div>
</template>
<script>
  import MissionAdd from './add'
  import MissionDetail from './detail'
  export default {
    name: 'mission',
    data: function(){
      return {
        loading: false,
        idShow: false,
        total: 2,
        currentPage: 1,
        pageSize: 10,
        tableData: [{
          mId: 1,
          mNumber: '10001',
          mType: '接收订单',
          mContent: '接乘客',
          eRemark: '无',
          createTime: 1540560471000,
          activeTime: 1540760471000
        },
          {
            mId: 2,
            mNumber: '10002',
            mType: '转发订单',
            mContent: '接乘客',
            eRemark: '无',
            createTime: 1540560471000,
            activeTime: 1540680471000
          }],
        addVisible: false, // 添加弹窗flag
        detailVisible: false, // 详情弹窗flag
        maskVisible: false, // 弹窗mask显示
        detailId: 0, // 详情ID
        filters: { // 搜索表单
          number: ''
        }
      };
    },
    components: {
      'mission-add': MissionAdd,
      'mission-detail': MissionDetail
    },
    methods: {
      // 搜索
      handleSearch(){
        console.info(this.filters.number);
      },
      // 详情
      handleDetail(row, event, column) {
        this.detailId = row.mId;
        this.maskVisible = true;
        this.detailVisible = true;
      },
      // 删除
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 选择每页显示条数
      handleSizeChange(val){
//        this.pageSize = val;
//        this.currentPage = 1;
      },
      // 跳转页
      handleCurrentChange(val){
//        this.currentPage = val;
      },
      // 添加弹窗
      showAddDialog(){
        this.addVisible = true;
      },
      // 关闭所有弹窗
      cancelVisible() {
        this.maskVisible = false;
        this.detailVisible = false;
      },
      // 创建日期转换
      dateFormatter(row, column) {
        return this.getDateValue(row.createTime);
      },
      // 执行日期转换
      activeTateFormatter(row, column) {
        return this.getDateValue(row.activeTime);
      },
      // 获取日期
      getDateValue(datetime) {
        if (datetime) {
          datetime = new Date(datetime);
          let y = datetime.getFullYear() + '-';
          let mon = datetime.getMonth() + 1 + '-';
          let d = datetime.getDate();
          return y + mon + d;
        }
        return ''
      },
    }
  }
</script>
<style lang="scss" scoped>
  .detail-box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 500px;
    height: 100%;
    overflow-y: auto;
    z-index: 2000;
    background-color: #fff;
  }
  .modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #000;
    opacity: .3;
  }
</style>

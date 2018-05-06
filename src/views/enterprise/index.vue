<template>
  <div>
    <el-col :span="24" class="warp-main" v-loading="loading" element-loading-text="拼命加载中">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.name" placeholder="请输入企业名称" auto-complete="off" @keyup.enter.native="fetchData"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" v-on:click="fetchData">查询</el-button>
          </el-form-item>
        </el-form>
        </el-form>
      </el-col>
      <el-table ref="multipleTable" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="eNumber" label="企业编号" width="180" sortable></el-table-column>
        <el-table-column prop="eName" label="企业名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="eIndustry" label="所属行业" width="180"></el-table-column>
        <el-table-column prop="eRange" label="经营范围" width="180"></el-table-column>
        <el-table-column prop="eModel" label="经营模式" width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" width="180"></el-table-column>
        <el-table-column prop="updateTime" label="更新日期" width="180"></el-table-column>
        <el-table-column prop="recordStatus" label="企业状态" width="180"></el-table-column>
      </el-table>
      <!--<div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>-->
      <el-col :span="24" class="toolbar">
        <el-pagination background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-col>
  </div>
</template>
<script>
  import API from '../../api/api_enterprise'
  export default {
    data() {
      return {
        loading: false,
        keyword: "集团",
        total: 5,
        currentPage: 1,
        pageSize: 10,
        tableData: [{
          eNumber: 'A10001',
          eName: 'YE集团',
          eIndustry: '金融业',
          eRange: '商业',
          eModel: '国有企业',
          createTime: '2017-03-27',
          updateTime: '2016-03-27',
          recordStatus: '1'
        }],
        multipleSelection: [],
        filters: {
          name: ''
        }
      }
    },
    created: function(){
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      //this.fetchData();  //调用接口获取动态数据

    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(function(row) {
            this.$refs.multipleTable.toggleRowSelection(row);
        });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      fetchData(){ //获取数据
        let that = this;
        let params = {
          curr: that.currentPage,
          pageSize: that.pageSize,
          keywords: that.filters.name
        };
        that.loading = true;
        API.findList(params).then(function(result){
          that.loading = false;
          that.total = result.count;
          that.currentPage = result.curr;
          that.tableData = result.data;
        }).catch(function (error) {
          that.loading = false;
          console.log(error);
        });
      },
      handleSizeChange(val){
        this.pageSize = val;
        this.currentPage = 1;
        this.fetchData();
//        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val){
        this.currentPage = val;
        this.fetchData();
//        console.log(`当前页: ${val}`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>
<style>
  .el-table th {
    text-align: center;
  }

  .el-table tbody tr td:first-child {
    text-align: center;
  }
</style>

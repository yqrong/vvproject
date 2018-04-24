<template>
  <el-row class="wrap">
    <el-col :span="24" class="wrap-breadcrumb">
      <el-breadcrumb seporate="/">
        <el-breadcrumb-item :to="{ path: '/'}"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
      <el-col :span="24" class="wrap-main">
        <section class="chart-container">
          <el-row>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px'}">
                <img src="../../assets/images/card.jpg">
                <div style="padding: 12px;">
                  <span>标题</span>
                  <div class="bottom clearfix">
                    <time class="time">2018-14-19</time>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px'}">
                <img src="../../assets/images/card.jpg">
                <div style="padding: 12px;">
                  <span>标题</span>
                  <div class="bottom clearfix">
                    <time class="time">2018-14-19</time>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px'}">
                <img src="../../assets/images/card.jpg">
                <div style="padding: 12px;">
                  <span>标题</span>
                  <div class="bottom clearfix">
                    <time class="time">2018-14-19</time>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <div id="chartColumn" style="width: 100%; height: 400px;"></div>
            </el-col>
            <el-col :span="12">
              <div id="chartBar" style="width: 100%; height: 400px;"></div>
            </el-col>
            <el-col :span="12"></el-col>
            <el-col :span="12"></el-col>
            <el-col :span="24"></el-col>
          </el-row>
        </section>
      </el-col>
    </el-col>
  </el-row>
</template>
<style>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
</style>
<script>
  import echarts from 'echarts'
  export default {
    name: 'dashboard',
    data(){
      return {
        chartColumn: null,
        chartBar: null
      }
    },
    mounted (){
      this.drawShape();
    },
    methods: {
      drawShape(){
        this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        this.chartBar = echarts.init(document.getElementById('chartBar'));

        this.chartColumn.setOption({
          title: { text: 'Column Chart' },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        });

        this.chartBar.setOption({
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330, 220]
            }
          ]
        });
      }
    }
  }
</script>

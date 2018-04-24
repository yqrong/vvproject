<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" style="padding-left:8px;"></a>
      </div>
      <div class="topbar-logos" v-show="!collapsed">
        <a href="/" style="color: #fff;">VV租行</a>
      </div>
      <div class="topbar-title">
        <el-row v-show="homeShow">
          <el-col :span="24">
            <el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
              <el-menu-item index="/">工作台</el-menu-item>
              <el-menu-item index="/enterpriseManager">企业管理</el-menu-item>
              <el-menu-item index="/orderManager">订单管理</el-menu-item>
              <el-menu-item index="/systemManager">系统管理</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
        <el-row v-show="enterpriseShow">
          <el-col :span="24">
            <el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
              <el-menu-item index="/enterpriseManager">企业信息</el-menu-item>
              <el-menu-item index="/vehicleManager">车辆信息</el-menu-item>
              <el-menu-item index="/deptManager">组织架构</el-menu-item>
              <el-menu-item index="/customerManager">客户管理</el-menu-item>
              <el-menu-item index="/partnerManager">伙伴管理</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="fa fa-user"></i> {{nickname}}   <i class="fa fa-caret-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-row>
</template>
<script>
  import $ from 'jquery'
  import {road} from '../road.js'
  import API from '../api/api_user';

  export default {
    name: 'home',
    data () {
      return {
        defaultActiveIndex: "/",
        loading: false,
        nickname: '',
        collapsed: false,
        homeShow: true,
        enterpriseShow: false
      }
    },
    created() {
      road.$on('setNickName', (text) => {
          this.nickname = text;
      });

      road.$on('goto', (url) => {
        if(url === "/login") {
          localStorage.removeItem('access-user');
          this.$router.push(url);
        }
      });
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchNavData()
    },
    methods: {
      handleSelect(index){
        this.defaultActiveIndex = index;
        if (index == "/") {
          this.homeShow = true;
          this.enterpriseShow = false;
        } else if (index == "/enterpriseManager") {
          this.homeShow = false;
          this.enterpriseShow = true;
        } else {
          this.homeShow = true;
          this.enterpriseShow = false;
        }
      },
      //折叠导航栏
      collapse () {
        this.collapsed = !this.collapsed;
      },
      fetchNavData () {
        var cur_path = this.$route.path; //获取当前路由
        var routers = this.$router.options.routes; // 获取路由对象
        var nav_type = "";
        for (var i = 0; i < routers.length; i++) {
          var children = routers[i].children;
          if(routers[i].children){
            for (var j = 0; j < children.length; j++) {
              var grand_children = children[j].children;
              for (var k = 0; k < grand_children.length; k++) {
                if (grand_children[k].path === cur_path) {
                  nav_type = routers[i].type;
                  break;
                }
              }
            }
          }
        }
        if (nav_type == "home") {
          this.defaultActiveIndex = "/";
          this.homeShow = true;
          this.enterpriseShow = false;
        } else if (nav_type == "enterprise") {
          this.defaultActiveIndex = "/enterpriseManager";
          this.homeShow = false;
          this.enterpriseShow = true;
        }
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout(){
        //logout
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          localStorage.removeItem('access-user');
          that.$router.go('/login'); //用go刷新
//          API.logout().then(function (result) {
//            console.info(result);
//            localStorage.removeItem('access-user');
//            that.$router.go('/login'); //用go刷新
//          }, function (err) {
//            console.info(err);
//            that.$message.error({showClose: true, message: err.toString(), duration: 2000});
//          }).catch(function (error) {
//            console.log(error);
//            that.$message.error({showClose: true, message: '请求出现异常', duration: 2000});
//          });
        }).catch(() => {});
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
    },
    watch: {
      '$route': 'fetchNavData'
    }
  }
</script>

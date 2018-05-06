/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import LeftNav from '@/components/nav/leftNav.vue'
import Home from '@/views/home.vue'
import Dashboard from '@/views/workbench/dashboard.vue'
import Mission from '@/views/workbench/mission.vue'
import Plan from '@/views/workbench/plan.vue'
import Maillist from '@/views/workbench/maillist.vue'
import EnterpriseList from '@/views/enterprise/index.vue'
import EnterpriseAdd from '@/views/enterprise/add.vue'
import EnterpriseDetail from '@/views/enterprise/detail.vue'
import EnterpriseValidate from '@/views/enterprise/validate.vue'
import VehicleManage from '@/views/vehicle/index.vue'
import DeptManager from '@/views/dept/index.vue'
import NotFound from '@/components/404.vue'
import Register from '@/views/admin/register.vue'
import RegisterNext from '@/views/admin/registerNext.vue'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/login'], resolve)

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/login',
      type: 'login',
      component: Login
    },
    {
      path: '/register',
      type: 'register',
      component: Register
    },
    {
      path: '/registerNext',
      type: 'register',
      component: RegisterNext
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      type: 'home',
      name: 'home',
      redirect: '/dashboard',
      component: Home,
      menuShow: true,
      children: [
        {
          path: '/dashboard',
          component: LeftNav,
          name: 'dashboard',
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/dashboard', component: Dashboard, name: '首页', menuShow: true }
          ]
        },
        {
          path: '/mySet',
          component: LeftNav,
          name: '我的设置',
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/mySet/plan', component: Plan, name: '行程计划', menuShow: true },
            { path: '/mySet/mission', component: Mission, name: '我的任务', menuShow: true },
            { path: '/mySet/maillist', component: Maillist, name: '通讯录', menuShow: true }
          ]
        }
      ]
    },
    {
      path: '/enterpriseManager',
      type: 'enterprise',
      name: 'enterprise',
      component: Home,
      redirect: '/enterprise/list',
      menuShow: true,
      children: [
        {
          path: '/enterpriseList',
          component: LeftNav,
          name: 'enterpriseList',
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/enterprise/list', component: EnterpriseList, name: '企业列表', menuShow: true },
            { path: '/enterprise/detail', component: EnterpriseDetail, name: '企业详情', menuShow: false }
          ]
        },
        {
          path: '/enterpriseAdd',
          component: LeftNav,
          name: 'enterpriseAdd',
          leaf: true, // 只有一个节点
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/enterprise/add', component: EnterpriseAdd, name: '企业添加', menuShow: true }
          ]
        },
        {
          path: '/enterpriseValidate',
          component: LeftNav,
          name: 'enterpriseValidate',
          leaf: true, // 只有一个节点
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/enterprise/validate', component: EnterpriseValidate, name: '企业认证', menuShow: true }
          ]
        }
      ]
    },
    {
      path: '/vehicleManager',
      type: 'enterprise',
      name: 'vehicle',
      component: Home,
      redirect: '/vehicle/list',
      menuShow: true,
      children: [
        {
          path: '/vehicleList',
          component: LeftNav,
          name: 'vehicleList',
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/vehicle/list', component: VehicleManage, name: '车辆信息', menuShow: true }
          ]
        }
      ]
    },
    {
      path: '/deptManager',
      type: 'enterprise',
      name: 'dept',
      component: Home,
      redirect: '/dept/list',
      menuShow: true,
      children: [
        {
          path: '/deptList',
          component: LeftNav,
          name: 'deptList',
          leaf: true, // 只有一个节点
          iconCls: 'iconfont icon-home', // 图标样式class
          menuShow: true,
          children: [
            { path: '/dept/list', component: DeptManager, name: '部门信息', menuShow: true }
          ]
        }
      ]
    }

  ]
});

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else if(to.path.startsWith('/register')){
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
});

export default router

/**
 * Created by yqr on 2018/3/26.
 */
import Vue from 'vue'
import Router from 'vue-router'
import HomeNav from '@/components/navs/homeNav.vue'
import Home from '@/components/home.vue'
import Dashboard from '@/components/workbench/dashboard.vue'
import Mission from '@/components/workbench/mission.vue'
import Plan from '@/components/workbench/plan.vue'
import Maillist from '@/components/workbench/maillist.vue'
import EnterpriseNav from '@/components/navs/enterpriseNav.vue'
import EnterpriseList from '@/components/enterprise/index.vue'
import EnterpriseAdd from '@/components/enterprise/add.vue'
import EnterpriseDetail from '@/components/enterprise/detail.vue'
import EnterpriseValidate from '@/components/enterprise/validate.vue'
import VehicleManage from '@/components/vehicle/index.vue'
import DeptManager from '@/components/dept/index.vue'
import CustomerManager from '@/components/customer/index.vue'
import PartnerManager from '@/components/partner/index.vue'
import NotFound from '@/components/404.vue'
import Register from '@/components/admin/register.vue'
import RegisterNext from '@/components/admin/registerNext.vue'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/login'], resolve)

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
          component: HomeNav,
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
          component: HomeNav,
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
          component: EnterpriseNav,
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
          component: EnterpriseNav,
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
          component: EnterpriseNav,
          name: 'enterpriseValidate',
          leaf: true, // 只有一个节点
          iconCls: 'el-icon-menu',
          menuShow: true,
          children: [
            { path: '/enterprise/validate', component: EnterpriseValidate, name: '企业认证', menuShow: true }
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

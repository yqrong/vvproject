<template>
  <el-col :span="24" class="main">
    <!--左侧导航-->
    <aside :class="{showSidebar:!collapsed}">
      <!--展开折叠开关-->
      <div class="menu-toggle" @click.prevent="collapse">
        <i class="iconfont icon-outdent" v-show="!collapsed" title="收起"></i>
        <i class="iconfont icon-outdent" v-show="collapsed" title="展开"></i>
      </div>
      <!--导航菜单-->
      <el-menu :default-active="defaultActiveIndex" router :collapse="collapsed" @select="handleSelect">
        <template v-for="(issue,index) in $router.options.routes">
          <template v-if="issue.type === 'home'">
            <template v-for="(item,index) in issue.children">
              <el-submenu v-if="!item.leaf" :index="index+''" v-show="item.menuShow">
                <template slot="title"><i :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
                <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow"
                              :class="$route.path==term.path?'is-active':''">
                  <i :class="term.iconCls"></i><span slot="title">{{term.name}}</span>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path"
                            :class="$route.path==item.children[0].path?'is-active':''" v-show="item.menuShow">
                <i :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </template>
        </template>
      </el-menu>
    </aside>
    <!--右侧内容区-->
    <section class="content-container">
      <div class="grid-content bg-purple-light">
        <el-col :span="24" class="content-wrapper">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </div>
    </section>
  </el-col>
</template>
<script>
  export default {
    name: 'homeNav',
    data () {
      return {
        defaultActiveIndex: "0",
        collapsed: false
      }
    },
    methods: {
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      }
    },
    watch: {
      '$route': function(to, from){ // 路由改变时执行
        //console.info("homeNav to.path:" + to.path);
      }
    }
  }
</script>


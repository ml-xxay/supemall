<template>
  <div id="app">
    <!-- 把 Detail组件排除在外   不保留之前的数值-->
    <keep-alive exclude="Detail">
     <router-view />
    </keep-alive>
    <main-tab-bar/>
   
  </div>
</template>
<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'
export default {
  name: "app",
  components: {
    MainTabBar
  },
};
</script>


<style>
@import "./assets/css/base.css";
/* html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: white;
}
.el-card {
  margin-top: 50px;
}
.a {
  text-align: center;
} */
</style>

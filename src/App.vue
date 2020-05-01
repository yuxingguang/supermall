<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <mainTabBar></mainTabBar>
    <Icon></Icon>
    <SvgIcon></SvgIcon>
  </div>
</template>
<script>
  import mainTabBar from "./components/content/MainTabbar/mainTabBar";
  import Icon from "./components/content/Icon/Icon";
  import SvgIcon from "./components/content/Icon/svg";
  export default {
    name:'App',
    components:{
      mainTabBar,
      Icon,
      SvgIcon
    }
  }
</script>
<style>
  @import "assets/css/base.css";
</style>

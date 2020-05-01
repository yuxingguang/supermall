<template>
  <TabBar>
    <TabBarItem path="/home">
      <img slot="item-icon" src="../../../assets/img/tabbar/home.svg" alt="卧槽">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/home_active.svg" alt="卧槽">
      <div slot="item-text">首页</div>
    </TabBarItem>
    <TabBarItem path="/category">
      <img slot="item-icon" src="../../../assets/img/tabbar/category.svg" alt="卧槽">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/category_active.svg" alt="卧槽">
      <div slot="item-text">分类</div>
    </TabBarItem>
    <TabBarItem path="/cart">
      <img slot="item-icon" src="../../../assets/img/tabbar/shopcart.svg" alt="卧槽">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/shopcart_active.svg" alt="卧槽">
      <div slot="item-text">购物车</div>
    </TabBarItem>
    <TabBarItem path="/profile">
      <img slot="item-icon" src="../../../assets/img/tabbar/profile.svg" alt="卧槽">
      <img slot="item-icon-active" src="../../../assets/img/tabbar/profile_active.svg" alt="卧槽">
      <div slot="item-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>
<!--此通用组件是用于主页路由跳转的 -->
<script>
  import TabBar from '../../common/TabBar/Tab';
  import TabBarItem from '../../common/TabBar/TabItem';
  export default {
    name: "mainTabBar",
    components:{
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>

<template>
  <div id="tabBar">
    <slot></slot>
  </div>
</template>
<!--此组件用于路由跳转选项卡-->
<script>
  export default {
    name: "TabBAR",
  }
</script>

<style scoped>
  #tabBar{
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;

    box-shadow: 0px -3px 1px rgba(100,100,100,0.1);
  }

</style>

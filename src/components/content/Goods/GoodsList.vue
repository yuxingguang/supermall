<template>
  <div id="goodsList">
    <GoodsListItem v-for="(item,index) in goods" :goodsItem="item" :key="index"></GoodsListItem>
  </div>
</template>
<!--此组件用于放置商品列表-->
<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    props:{
      goods:{
        type:Array,
        default:[]
      }
    },
    components:{
      GoodsListItem
    }
  }
</script>

<style scoped>
#goodsList{
  margin-top: 3px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>

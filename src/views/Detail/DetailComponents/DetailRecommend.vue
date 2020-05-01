<template>
  <div class="rec">
    <div class="rec-title">
      热门推荐
    </div>
    <GoodsList :goods="goodsList"></GoodsList>
  </div>
</template>
<script>
  import GoodsList from "../../../components/content/Goods/GoodsList";
  export default {
    name: "DetailRecommend",
    props:{
      goodsList:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    components:{
      GoodsList
    }
  }
</script>

<style scoped>
  .rec{
    padding: 5px;
  }
  .rec-title{
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
</style>

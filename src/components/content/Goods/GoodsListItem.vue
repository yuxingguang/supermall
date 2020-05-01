<template>
  <div class="goodsItem" @click="itemClick" v-if="goodsItem">
    <img :src="image" alt="加载失败" @load="loadImage">
    <div class="goodsInfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>
<!--此组件用于展示商品简略图-->
<script>
  export default {
    name: "GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default:null
      }
    },
    computed:{
      image(){
        //不可以直接查goodsItem.show.img,因为goodsItem.show不存在，则goodsItem.show.image必定报错
        return this.goodsItem.show?this.goodsItem.show.img:(this.goodsItem.image||this.goodsItem.img);
      }
    },
    methods:{
      loadImage(){
        this.$bus.$emit('itemImageLoad');
      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid);
      }
    }
  }
</script>

<style scoped>
  .goodsItem{
    width: 48%;
    font-size: 15px;
    padding-bottom: 20px;
  }
  .goodsItem img{
    width: 100%;
    border-radius: 5px;       /*圆圆滚滚可可爱爱*/
  }
  .goodsInfo{
    padding-top: 10px;
    font-size: 12px;
    overflow: hidden;
    text-align: center;
  }
  .goodsInfo p{
    /*隐藏文本三步骤：1.不换行 2.超出隐藏 3.隐藏样式为省略号*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goodsInfo .price{
    margin-right: 20px;
    color: var(--color-high-text);
  }
  .goodsInfo .collect {
    position: relative;
  }
  .goodsInfo .collect::before{
    content: '';
    position: absolute;
    left: -14px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") center center/14px 14px;
  }
</style>

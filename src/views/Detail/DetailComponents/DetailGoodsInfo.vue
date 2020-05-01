<template>
  <div class="goods-info">
    <div class="info-desc">
      <div class="start"></div>
      <div class="desc">{{goodsInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <p class="info-key">{{goodsInfo.key}}</p>
    <div class="info-img">
      <img v-for="(img,index) in goodsInfo.list" :key="index" :src="img" alt="" @load="imageLoad">
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailGoodsInfo",
    data(){
      return{
        imageLength:0,
        counter:0
      }
    },
    props:{
      goodsInfo:{
        type:Object,
        default:()=>{}
      }
    },
    watch:{
      goodsInfo(){
        this.imageLength = this.goodsInfo.list.length;
      }
    },
    methods:{
      imageLoad(){
        if(++this.counter >= this.imageLength){
          this.$emit('imageLoadReady');
          console.log('商品详情中的图片加载完毕');
        }
      }
    }
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-desc {
    padding: 0 15px;
  }
  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }
  .start::before,.end::after{
    position: absolute;
    content: '';
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }
  .end::after{
    right: 0;
  }
  .start::before{
    left: 0;
  }
  .info-desc .desc{
    padding: 15px 0;
    font-size: 14px;
  }
  .info-key{
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .info-img img{
    width: 100%;
  }
</style>

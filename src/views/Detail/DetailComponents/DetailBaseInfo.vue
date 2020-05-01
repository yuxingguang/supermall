<template>
  <div class="base-info" v-if="Object.keys(baseInfo).length !== 0">
    <div>
      <div class="baseTitle">{{baseInfo.title}}</div>
    </div>
    <div class="price">
      <span class="price-s">{{baseInfo.showPrice}}</span>
      <span class="price-o">{{baseInfo.oldPrice}}</span>
      <span v-if="baseInfo.discountDesc" class="disc-desc">{{baseInfo.discountDesc}}</span>
    </div>
    <div class="infoOther">
      <span>{{baseInfo.sales}}</span>
      <span>{{baseInfo.collect}}</span>
      <span v-if="baseInfo.service.length">{{baseInfo.service[baseInfo.service.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-s-item" v-for="index in baseInfo.service.length-1">
        <img :src="baseInfo.service[index-1].icon" alt="">
        <span>{{baseInfo.service[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      baseInfo: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  }
</script>

<style scoped>
  .base-info {
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
  }
  .baseTitle{
    color: #222;

  }
  .price{
    margin-top: 10px;
  }
  .price .price-s{
    color: var(--color-high-text);
    font-size: 24px;
  }
  .price .price-o{
    text-decoration: line-through;
    font-size: 13px;
    margin-left: 5px;
  }
  .price .disc-desc{
    border-radius: 8px;
    background-color: var(--color-high-text);
    color: #fff;
    font-size: 12px;
    margin-left: 5px;
    padding: 2px 5px;
    position: relative;
    top:-8px;
  }
  .infoOther{
    display: flex;
    justify-content:space-between;
    font-size: 13px;
    line-height: 30px;
    margin-top: 15px;
    border-bottom: 1px solid rgba(100,100,100,0.1);
  }
  .info-service{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .info-s-item{
    font-size: 13px;
    color: #333;
  }
  .info-s-item img{
    width: 14px;
    height: 14px;
    position: relative;
    top:2px;
  }
</style>

<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shopInfo.shopLogo" alt="">
      <span>{{shopInfo.shopName}}</span>
    </div>
    <div class="shop-mid">
      <div class="shop-mid-left">
        <div class="sale">
          <p>{{shopInfo.saleNum | sellCountFilter}}</p>
          <p>总销量</p>
        </div>
        <div class="comment">
          <p>{{shopInfo.goodsNum}}</p>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="shop-mid-right">
        <table>
          <tr v-for="item in shopInfo.score" :class="{'yes':item.isBetter,'no':!item.isBetter}">
            <td>{{item.name}}</td>
            <td>{{item.score}}</td>
            <td><span>{{item.isBetter?'高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
  import TabBAR from "../../../components/common/TabBar/Tab";
  export default {
    name: "DetailShopInfo",
    components: {TabBAR},
    props:{
      shopInfo:{
        type:Object,
        default:()=>{}
      }
    },
    filters:{
      sellCountFilter:value => value<10000 ? value : (value/10000).toFixed(1) + '万'
    }
  }
</script>

<style scoped>
.shop-info{
  width: 100%;
  padding: 20px 8px 10px;
  border-bottom: 5px solid #f2f5f8;
}
.shop-top{
  line-height: 45px;
  display: flex;
  align-items: center;
}
.shop-top img{
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,.1);
}
.shop-top span{
  margin-left: 10px;
}
.shop-mid{
  margin-top: 15px;
  display: flex;
}
.shop-mid .shop-mid-left{
  color: #333;
  text-align: center;
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  flex: 1;
  border-right: 1px solid #eee;
}

  .shop-mid-left p:first-child{
    font-size: 18px;
  }
  .shop-mid-left p:last-child{
    font-size: 12px;
    margin-top: 10px;
  }

.shop-mid .shop-mid-right{
  position: relative;     /*使用相对移动*/
  left: 30px;
  font-size: 13px;
  flex: 1;
}

.shop-mid-right table td{
  padding: 5px 5px;
}
.no td:nth-child(2){
  color: #5ea732;
}
.no td:last-child span{
  background-color: #5ea732;
  color: #fff;
}
.yes td:nth-child(2){
  color: #f13e3a;
}
.yes td:last-child span{
  background-color: #f13e3a;
  color: #fff;
}
  .shop-bottom{
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }
  .shop-bottom .enter-shop{
    background-color: #f2f5f8;
    border-radius: 5px;
    line-height: 20px;
    font-size: 15px;
    color: #666;
    padding: 5px 20px;
  }
</style>

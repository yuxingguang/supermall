<template>
  <div class="shop-item">
    <div class="item-selector">
      <CheckButton :checked="cartItem.checked" @checkBtnClick="reverseChecked"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="cartItem.img" alt="">
    </div>
    <div class="item-info">
      <div class="info-title">{{cartItem.title}}</div>
      <div class="info-desc">{{cartItem.desc}}</div>
      <div class="info-money">
        <div class="price left">￥{{cartItem.price}}</div>
        <div class="right">
          <button class="btn" @click="changeNum(false)">-</button>
          &nbsp;x{{cartItem.num}}&nbsp;
          <button class="btn" @click="changeNum(true)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "./CheckButton";
  export default {
    name: "CartItem",
    props:{
      cartItem:{
        type:Object,
        default(){
          return {};
        }
      }
    },
    methods:{
      changeNum(flag){
        this.$store.commit('addCart',{obj:this.cartItem,flag});
      },
      reverseChecked(){
        this.$store.commit('reverseChecked',this.cartItem);
      }
    },
    components:{
      CheckButton
    }
  }
</script>

<style scoped>
.shop-item{
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  display: flex;
}
  .item-selector{
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-img{
    padding: 5px;
  }
  .item-img img{
    width: 80px;
    height: 100px;
    border-radius: 5px;
  }
  .item-info{
    overflow: hidden;        /*避免子元素把父元素撑宽*/
    position: relative;
    padding: 5px 10px;
  }
  .item-info .info-title,.item-info .info-desc{
    overflow: hidden;
    white-space: nowrap;      /*不换行*/
    text-overflow: ellipsis;
  }
  .item-info .info-title{
    font-size: 16px;
    color: #333;
  }
  .item-info .info-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-money{
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    text-align: center;
  }
  .info-money .price {
    color: orangered;
  }
  .info-money .btn{
    width: 20px;
    height: 20px;
  }
</style>

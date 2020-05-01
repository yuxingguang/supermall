<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" :checked="allSelected" @checkBtnClick="selectAll(!allSelected)"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product">去计算({{cartCount}})</span>
  </div>
</template>

<script>
  import CheckButton from '../../../components/content/CartList/CheckButton'

	export default {
		name: "BottomBar",
    computed:{
		  allSelected(){
		    return this.$store.state.cartList.every(item=>item.checked)
      },
      totalPrice(){
		    let sum = 0;
		    this.$store.state.cartList.forEach(item=>{
		      let price = parseFloat(item.price);
		      sum += price*item.checked*item.num;
        })
        return sum.toFixed(2)
      },
      cartCount(){
        return this.$store.state.cartList.filter(item=>item.checked).length;
      }
    },
    components: {
		  CheckButton
    },
    methods:{
      selectAll(yes){
        this.$store.commit('controlAll',yes);
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>

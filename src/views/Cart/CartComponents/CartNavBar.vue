<template>
  <NavBar class="cart-nav">
    <span slot="center">购物车({{$store.state.cartList.length}})</span>
  </NavBar>
</template>

<script>
  import NavBar from "../../../components/common/nav/NavBar";
  export default {
    name: "CartNavBar",
    components:{
      NavBar,
    }
  }
</script>

<style scoped>
  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>

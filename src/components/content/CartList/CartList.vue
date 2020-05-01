<template>
  <div>
    <CartItem v-for="(item,index) in cartList" :cartItem="item" :key="index"></CartItem>
  </div>
</template>

<script>
  import CartItem from "./CartItem";
  export default {
    name: "CartList",
    props:{
      cartList:{
        type:Array,
        default(){
          return [];
        }
      }
    },
    components:{
      CartItem
    }
  }
</script>

<style scoped>

</style>

<template>
  <div id="cart">
    <CartNavBar></CartNavBar>
    <Scroll class="scroll" ref="scroll" :clickFlag="true">
      <CartList :cartList="$store.state.cartList">
      </CartList>
    </Scroll>
    <BottomBar></BottomBar>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import CartNavBar from "./CartComponents/CartNavBar";
  import CartList from "../../components/content/CartList/CartList";
  import BottomBar from "./CartComponents/BottomBar";
  export default {
    name: 'HelloWorld',
    components:{
      CartNavBar,
      Scroll,
      CartList,
      BottomBar
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  #cart{
    height: calc(100vh - 49px);
    width: 100%;
  }
.scroll{
  height: calc(100% - 44px - 44px);
  overflow: hidden;
}
</style>

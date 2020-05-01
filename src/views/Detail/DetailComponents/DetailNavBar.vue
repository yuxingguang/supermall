<template>
  <NavBar>
    <div slot="left" class="detailLeft" @click="backHome"></div>
    <div slot="center" class="detailCenter">
      <div class="centerItem"
           :class="{'active':currentIndex === index}"
           v-for="(item,index) of titles"
           @click="chooseIndex(index)">{{item}}</div>
    </div>
  </NavBar>
</template>

<script>
  import NavBar from "../../../components/common/nav/NavBar";
  export default {
    name: "DetailNavBar",
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    components:{
      NavBar
    },
    methods:{
      backHome(){
        this.$router.back();
      },
      chooseIndex(value){
        this.currentIndex = value;
        this.$emit('navJump',value)
      }
    }
  }
</script>
<style scoped>
  .detailLeft{
    width: 100%;
    height: 100%;
    background: url("../../../assets/img/common/back.svg") no-repeat center center/100% 45%;
  }
  .detailCenter{
    font-size: 13px;
    display: flex;
  }
  .detailCenter .centerItem{
    flex-grow: 1;
  }
  .active{
    color: var(--color-high-text);
  }
</style>

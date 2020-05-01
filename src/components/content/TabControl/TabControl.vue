<template>
  <div class="tab">
    <div class="tabItem" v-for="(item,index) in titles" @click="itemClick(index)" :class="{'active':index===currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data(){
      return{
        currentIndex:0
      }
    },
    props:{
      titles:{
        type:Array,
        default:[]
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex=index;
        this.$emit('goodsShowType',index);
      }
    }
  }
</script>

<style scoped>
  .tab{
    width: 100%;
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab .tabItem{
    flex:1;
  }
  .tab .tabItem span{
    padding: 5px 10px;
  }
  .tab .active{
    color: deeppink;
  }
  .tab .active span{
    border-bottom: 2px solid deeppink;
  }
</style>

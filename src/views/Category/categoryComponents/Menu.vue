<template>
  <Scroll class="menu" :probe-type="0" :click-flag="true">
    <div v-for="(item,index) in categories" :key="index" v-if="categories"
         class="menu-item"
         @click="itemclick(index)"
         :class="{'activated':currentIndex===index}">{{item.title}}
    </div>
  </Scroll>
</template>

<script>
  import Scroll from "../../../components/common/scroll/Scroll";
  export default {
    name: "Menu",
    data(){
      return{
        currentIndex:0
      }
    },
    props:{
      categories:Array
    },
    methods:{
      itemclick(index){
        this.currentIndex = index;   //控制激活样式改变
        this.$emit('categoryChanged',index);
      }
    },
    components:{
      Scroll
    }
  }
</script>

<style scoped>
.menu{
  height: 100%;
  width: 100px;
  overflow: hidden;
  background-color: #f6f6f6;
}
  .menu-item{
    height: 45px;
    line-height: 60px;
    text-align: center;
    color: #666666;
    font-size: 14px;
  }
  .activated{
    color: var(--color-high-text);
    border-left: 3px solid var(--color-high-text);
    background-color: #ffffff;
    font-weight: 700;
  }
</style>

<template>
  <div id="recommend">
    <div class="recommendItems" v-for="item in adImg">
      <div>
        <a :href="item.link">
          <img :src="item.image" alt="加载失败">
        </a>
      </div>
      <div>
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props:{
      adImg:{
        type:Array,
        default:[]
      }
    }
  }
</script>

<style scoped>
  #recommend{
    width: 100%;
    display: flex;
    text-align: center;
    padding: 10px 0 10px;
  }
  .recommendItems{
    padding: 10px;
    flex: 1;
    font-size: 12px;
  }
  .recommendItems img{
    width: 70px;
    height:70px;
  }

</style>

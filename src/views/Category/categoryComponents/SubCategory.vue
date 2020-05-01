<template>
  <div id="subcategory">
    <div class="subItem"
         v-for="item in subCategory"
         v-if="subCategory.length">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SubCategory",
    props:{
      subCategory:Array
    }
  }
</script>

<style scoped>
  #subcategory{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }
  .subItem{
    width: 27%;
    padding: 10px;
    font-size: 13px;
    text-align: center;
  }
  .subItem img{
    width: 100%;
  }
  .subItem .title{
    margin-top: 6px;
  }
</style>

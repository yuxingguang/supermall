<template>
  <Swiper>
    <SwiperItem class="item" v-for="item in banner">
        <img :src="item" alt="加载失败">
    </SwiperItem>
  </Swiper>
</template>

<script>
  import Swiper from "../../../components/common/swiper/Swiper";
  import SwiperItem from "../../../components/common/swiper/SwiperItem";

  export default {
    name: "DetailSwiper",
    props:{
      banner:{
        type:Array,
        default:[]
      }
    },
    data(){
      return{
        flag:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
.item{
  height: 300px;
  overflow: hidden;
}
</style>

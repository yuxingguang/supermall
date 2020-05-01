<template>
  <Swiper>
    <SwiperItem v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" alt="加载失败" @load="loadImage">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from '../../../components/common/swiper/index'
  export default {
    name: "HomeSwiper",
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
    },
    methods:{
      loadImage(){
        if(!this.flag){
          this.flag = true;
          this.$emit('swiperImageLoad');
        }

      }
    }

  }
</script>
<style scoped>

</style>

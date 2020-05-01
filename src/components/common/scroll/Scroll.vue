<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    data(){
      return {
        scroll:null,
        curPos:0
      }
    },
    props:{
      probeType:{
        type:Number,
        default(){
          return 1;
        }
      },
      clickFlag:{
        type:Boolean,
        default() {
          return false;
        }
      }
    },
    mounted() {
      // const wrapper = document.querySelector('#wrapper');
      //用refs来取，不然不管是取className还是id，当同一界面复用两次以上该组件，就会取错的！
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:this.clickFlag,             //！！这两个数据应该由父组件决定！！
        pullUpLoad:true,
        probeType:this.probeType
      });
      this.scroll.on('scroll',this.onScroll);
      this.scroll.on('pullingUp',this.onPullUp);
    },
    methods:{
      toTop(){
        this.scroll && this.scroll.scrollTo(0,0,1000);  //先检测scroll对象是否为空，避免scroll对象还未生成就被调用
      },
      refresh(){
        this.scroll && this.scroll.refresh();  //同样先检测scroll是否为空
      },
      onScroll(pos){
        this.curPos = pos;
        this.$emit('onScroll',pos);  //监听scroll事件，并将滚动坐标发出
      },
      onPullUp(){
        this.$emit('loadMore');
      },
      finishLoad(){
        console.log('调用了finish方法');
        this.scroll.finishPullUp();
      },
      scrollTo(x,y,time=0){
        this.scroll && this.scroll.scrollTo(x,y,time);
      }
    }
  }
</script>

<style scoped>

</style>

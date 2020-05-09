<template>
  <div id="hy-swiper">
    <div class="swiper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <slot></slot>
    </div>
    <div id="indicator">
      <div class="inner_indicator" v-for="item in slideCount" :class="{'active':currentIndex===item}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    data(){
      return{
        slideCount:0,
        currentIndex:1,
        totalWidth:0,
        swiperStyle:{},
        index:0,
        timerkey:null,
      }
    },
    props:{
      animation:{
        type:Number,
        default:700
      },
      interval:{
        type:Number,
        default:4000
      },
      judgeRatio:{
        type:Number,
        default:0.25
      }
    },
    mounted() {
      //添加DOM和获取样式
      window.setTimeout(()=>{
        this.handleDom();
        this.startTimer();
      },300)
    },
    methods:{
      //获取DOM方法
      handleDom(){
        let swiper = document.querySelector('.swiper');//静态Nodelist
        let slides = swiper.getElementsByClassName('slide'); //这个是动态nodelist
        this.slideCount = slides.length;
        if(this.slideCount>1){
          let firstSlide = slides[0].cloneNode(true);//一定要记得把子节点也复制过来啊
          let lastSlide = slides[slides.length-1].cloneNode(true);
          swiper.insertBefore(lastSlide,slides[0]);
          swiper.append(firstSlide);
          this.swiperStyle = swiper.style;
          this.totalWidth = swiper.offsetWidth;
          this.setTransform(-this.totalWidth);
        }
      },
      setTransform(position){
        this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
      },
      scrollContent(index){
        this.scrolling = true;
        this.swiperStyle.transition=`transform ${this.animation}ms`;
        this.setTransform(-index*this.totalWidth);
        this.checkPosition();
      },
      startTimer(){
        this.timerkey = window.setInterval(()=>{
          this.currentIndex++;
          this.scrollContent(this.currentIndex);
        },this.interval);
      },
      stopTimer(){
        window.clearInterval(this.timerkey);
      },
      checkPosition(){
        window.setTimeout(()=>{
          this.swiperStyle.transition=`0ms`;
          if(this.currentIndex >= this.slideCount+1){
            this.currentIndex=1;
          }else if(this.currentIndex<=0){
            this.currentIndex = this.slideCount;
          }
          this.setTransform(-this.currentIndex*this.totalWidth);  //这里不可以用scrollContent,会死循环的
          this.scrolling = false;          //这里我和源码不一样，源码放在了scrollContent里了，但由于动画延迟，判断会有失误
        },this.animation);
        // this.swiperStyle.transition=`0ms`;
      },
      touchstart(event){
        if(this.scrolling){
          return;
        }
        this.enter = true;
        this.stopTimer();
        this.startX = event.touches[0].clientX;
        // event.preventDefault();
      },
      touchmove(event){
        if(this.scrolling && !this.enter){
          return;
        }
        this.distance = event.touches[0].clientX - this.startX;
        let currentPosition = -this.currentIndex*this.totalWidth + this.distance;
        this.setTransform(currentPosition);
      },
      touchend(event){
        if(this.scrolling && !this.enter){
          return;
        }
        let offset = Math.abs(this.distance);
        if(offset===0){
          return;
        }else if(this.distance>0 && offset>this.totalWidth*this.judgeRatio){
          this.currentIndex--;
        }else if(this.distance<0 && offset>this.totalWidth*this.judgeRatio){
          this.currentIndex++;
        }
        this.scrollContent(this.currentIndex);
        this.startTimer();
      }
    }
  }
</script>

<style scoped>
  #hy-swiper{
    position: relative;
    overflow: hidden;
  }
  .swiper{
    display: flex;
    /*width: 100%;*/
  }
  #indicator{
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 8px;
    width: 100%;
  }
  .inner_indicator{
    margin: 0 5px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    box-sizing: border-box;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
  }
  #indicator .active {
    background-color: rgba(212,62,46,1.0);
  }
</style>

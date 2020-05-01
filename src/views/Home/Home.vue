<template>
  <div id="home">
    <NavBar class="navBar">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl :titles="['流行','新款','精选']"
                ref="tabControl1"
                class="alterTabControl"
                @goodsShowType="chooseGoodsType" v-show="showTab"></TabControl>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            :click-flag="true"
            @onScroll="judgeShow" @loadMore="loadMore">
      <HomeSwiper class="banner" :banner="banner" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <HomeRecommend :adImg="recommend"></HomeRecommend>
      <HomeFeature></HomeFeature>
      <TabControl :titles="['流行','新款','精选']"
                  ref="tabControl2"
                  @goodsShowType="chooseGoodsType"></TabControl>
      <GoodsList :goods="goods[goodsType].list"></GoodsList>
    </Scroll>
    <BackTop id="backTop"
             v-show="showToTop"
             @click.native="backTopClick"></BackTop>
  </div>
</template>

<script>
  import NavBar from "components/common/nav/NavBar";
  import HomeSwiper from "./HomeComponenets/HomeSwiper";
  import HomeRecommend from "./HomeComponenets/HomeRecommend";
  import HomeFeature from "./HomeComponenets/HomeFeature";
  import TabControl from "../../components/content/TabControl/TabControl";
  import GoodsList from "../../components/content/Goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/BackTop/BackTop";

  import {getMultiData,getHomeGoods} from '../../network/home'

  import debounce from '../../JS/debounce'

  /**
   * BUG1:TabControl未实现sticky效果
   * BUG2：数据请求结束后才调用finishLoad()
   */

  export default {
    name: "index",
    data(){
      return{
        showThreshold:1000,
        banner:[],
        recommend:[],
        goodsType:'pop',
        showTab:false,          //是否显示用于伪装吸顶效果的选项卡
        showToTop:false,        //是否显示回到最顶端图标
        tabOffsetTop:0,         //记录选项卡的top偏移量
        goods:{
          'pop' : { page:0 , list:[] },
          'new' : { page:0 , list:[] },
          'sell' : { page:0 , list:[] }
        },
        itemImgLoad:null,
        leavePos:0
      }
    },
    components:{
      Scroll,
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeature,
      TabControl,
      GoodsList,
      BackTop
    },
    created() {
      this.getHomeGoods('sell');
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getMultiData();
    },
    mounted() {
      this.itemImgLoad = debounce(this.$refs.scroll.refresh,100);   // 对BScroll的更新进行防抖处理
      this.$bus.$on('itemImageLoad',this.itemImgLoad);
    },
    activated() {
      this.$bus.$on('itemImageLoad',this.itemImgLoad);     //激活后重新开始监听itemImageLoad事件
      this.$refs.scroll.refresh();                    //有点邪门啊,具体原因也不知道，只是刚进来不刷新会有莫名跳转问题
      this.$refs.scroll.scrollTo(0,this.leavePos);
    },
    deactivated() {
      // 1.记录滚动位置
      this.leavePos = this.$refs.scroll.curPos.y;
      // 2.取消监听图片加载事件
      this.$bus.$off('itemImageLoad',this.itemImgLoad);
    },
    methods:{
      /**
       *  网络请求相关方法
       */
      getHomeGoods(type){
        let page = ++this.goods[type].page;
        getHomeGoods(type,page).then(res=>{
          this.goods[type].list.push(...res.data.list);
        });
      },
      getMultiData:function () {
        getMultiData().then(res=>{
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        })
      },

      /**
       * 设置当前浏览商品种类
       */
      chooseGoodsType(index){
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
        this.goodsType = Object.keys(this.goods)[index];
      },
      /**
       * 回到顶端
       */
      backTopClick(){
        this.$refs.scroll.toTop();
      },
      /**
       * 通过监听滚动事件，判断是否切换选项卡
       */
      judgeShow(pos){
        let scrollY = Math.abs(pos.y);
        // console.log(scrollY);
        this.showTab = scrollY > (this.tabOffsetTop-44);   //ZHE
        this.showToTop = scrollY > this.showThreshold;
      },
      /**
       * 当图片下拉到底部时，加载更多图片
       */
      loadMore(){
        // console.log(this.goodsType);
        this.getHomeGoods(this.goodsType);
        this.$refs.scroll.finishLoad();       //这里应该有个BUG:就是应该等数据获取完成之后才能调用finishLoad()
      },
      /**
       * 用于获取选项卡的offsetTop值，用于显形和隐形的选项卡切换
       */
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
          // console.log(this.tabOffsetTop);
      }
    }
  }
</script>
<style scoped>
  #home{
    position: relative;
    height: calc(100vh - 49px);
  }
  #home .navBar {
    background-color: var(--color-tint);
    color: #f6f6f6;
    /*position: fixed;*/
    /*top: 0;*/
    z-index: 9;
  }
  #home .banner{
    /*padding-top: 44px;*/
  }
  .content{
    width: 100%;
    height: calc(100% - 44px);
    overflow: hidden;
  }
  #backTop{
    position: absolute;
    right: 10px;
    bottom: 20px;
  }
  .alterTabControl{
    position: absolute;
    top:44px;
    z-index:9;
  }
</style>

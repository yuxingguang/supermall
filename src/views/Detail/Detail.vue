<template>
  <div id="detail">
    <DetailNavBar @navJump="navJump" ref="nav"></DetailNavBar>
    <Scroll class="scroll"
            :probe-type="3"
            :click-flag="true"
            ref="scroll"
            @onScroll="showNav">
      <DetailSwiper :banner="topImage"></DetailSwiper>
      <DetailBaseInfo :base-info="baseInfo"></DetailBaseInfo>
      <DetailShopInfo :shop-info="shopInfo"></DetailShopInfo>
      <DetailGoodsInfo :goods-info="goodsInfo" @imageLoadReady="toRefresh"></DetailGoodsInfo>
      <DetailParamsInfo ref="params" :goods-params="goodsParams"></DetailParamsInfo>
      <DetailComment ref="comment" :comment="comment"></DetailComment>
      <DetailRecommend ref="recommend" :goodsList="recommend"></DetailRecommend>
    </Scroll>
    <DetailBottomBar @addToCart="addCart"></DetailBottomBar>
    <Toast message="已加入购物车" ref="toast"></Toast>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailNavBar from "./DetailComponents/DetailNavBar";
  import DetailSwiper from "./DetailComponents/DetailSwiper";
  import DetailBaseInfo from "./DetailComponents/DetailBaseInfo";
  import DetailShopInfo from "./DetailComponents/DetailShopInfo";
  import DetailGoodsInfo from "./DetailComponents/DetailGoodsInfo";
  import DetailParamsInfo from "./DetailComponents/DetailParamsInfo";
  import DetailComment from "./DetailComponents/DetailComment";
  import DetailRecommend from "./DetailComponents/DetailRecommend";
  import DetailBottomBar from "./DetailComponents/DetailBottomBar";
  import Toast from "../../components/common/toast/Toast";
  import {getDetailData,getRecommend,BaseInfo,ShopInfo,GoodsInfo,GoodsParam} from "../../network/detail";
  import debounce from "../../JS/debounce";

  export default {
    name: "Detail",
    data(){
      return {
        iid:'',
        topImage:[],         //轮播图中的图片
        baseInfo:{},
        shopInfo:{},
        goodsInfo:{},
        goodsParams:{},
        comment:{},
        recommend:[],
        jumpPositionY:[],
        itemImgLoad:null    //设置组件offsetTop值的函数
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailComment,
      DetailRecommend,
      DetailBottomBar,
      Toast
    },
    created() {
      this.iid=this.$route.params.iid;
      getDetailData(this.iid).then(res=>{
        const data = res.result;
        this.topImage = data.itemInfo.topImages;
        this.baseInfo = new BaseInfo(data);
        this.shopInfo = new ShopInfo(data.shopInfo);
        this.goodsInfo = new GoodsInfo(data.detailInfo);
        this.goodsParams = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        this.comment = data.rate.list[0];
      });
      getRecommend().then(res=>{
        this.recommend = res.data.list;
        // console.log(res.data.list);
      });
      this.itemImgLoad = ()=>{
        this.jumpPositionY=[];
        this.jumpPositionY.push(0);
        this.jumpPositionY.push(this.$refs.params.$el.offsetTop);   //这个el必须是组件才能用，如果是普通标签则不行
        this.jumpPositionY.push(this.$refs.comment.$el.offsetTop);
        this.jumpPositionY.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.jumpPositionY);
      }
    },
    methods:{
      /**
       * 所有商品详情图片加载完成后，更新BScroll组件，并设置四个组件的offsetTop值
       */
      toRefresh(){
        // this.$refs.scroll.sayHeight();   //比较图片加载成功前后的滚动长度，就知道刷新的重要性了
        this.$refs.scroll.refresh();
        // this.$refs.scroll.sayHeight();
        this.itemImgLoad();
      },
      navJump(index){
        this.$refs.scroll.scroll.scrollTo(0,-this.jumpPositionY[index],1000);
      },
      /**
       * 根据滚动位置，判断现在处于哪一个组件
       * @param pos：滚动位置
       */
      showNav(pos){
        let y = Math.abs(pos.y);
        let aim = 0;
        let flag =this.jumpPositionY.every((item,index,array)=>{
          aim = index;
          return y >= item;
        });
        aim = flag ? aim : aim-1;                        //我简直就是个天才，用every函数做判断
        this.$refs.nav.currentIndex = aim;
      },
      /**
       * 将该商品添加到购物车中
       */
      addCart(){
        this.$refs.toast.fade();
        const obj = {};
        obj.iid = this.iid;
        obj.img = this.topImage[0];
        obj.title = this.baseInfo.title;
        obj.desc = this.goodsInfo.desc;
        obj.price = this.baseInfo.nowPrice;
        obj.checked = true;  //该数据作为购物车中被选中的标志
        obj.num = 1;      //初始化购物数量为1，若重复++
        this.$store.commit('addCart',{obj,flag:true});
      }
    }
  }
</script>
<style scoped>
  #detail{
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 9;
  }
  .scroll{
    width: 100%;
    overflow: hidden;
    position: relative;  /*用于保证Scroll内的各元素定位准确*/
    height: calc(100% - 44px - 58px);
  }
</style>

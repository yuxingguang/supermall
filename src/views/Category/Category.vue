<template>
  <div id="category">
    <NavBar class="nav-bar"><div slot="center">商品分类</div></NavBar>
    <div class="main">
      <Menu :categories="categories" @categoryChanged="_getSubcategories"></Menu>
      <Scroll class="main-right" :probe-type="1" :click-flag="true">
        <SubCategory v-if="categoryData[currentIndex]" :sub-category="categoryData[currentIndex].subcategories"></SubCategory>
        <TabControl :titles="['综合','新品','销量']" @goodsShowType="subTypeChanged"></TabControl>
        <GoodsList v-if="categoryData[currentIndex]" :goods="categoryData[currentIndex].categoryDetail[subcategoryType]"></GoodsList>
      </Scroll>
    </div>
  </div>
</template>

<script>
  import NavBar from "../../components/common/nav/NavBar";
  import Menu from "./categoryComponents/Menu";
  import Scroll from "../../components/common/scroll/Scroll";
  import SubCategory from "./categoryComponents/SubCategory";
  import TabControl from "../../components/content/TabControl/TabControl";
  import GoodsList from "../../components/content/Goods/GoodsList";
  import {getCategory,getSubcategory,getCategoryDetail} from '../../network/category'
  export default {
    name:'Category',
    data(){
      return {
        categories:[],
        categoryData:[],
        currentIndex:0,
        subcategoryType:'new'
      }
    },
    components:{
      NavBar,
      Menu,
      Scroll,
      SubCategory,
      TabControl,
      GoodsList
    },
    created() {
      getCategory().then(res=>{
        //1.获取菜单栏标识
        this.categories = res.data.category.list;
        //2.初始化菜单栏展示数据
        const length = this.categories.length;
        let i =0;
        while(i<length){
          this.categoryData.push(new this.Type());
          i++;
        }
      }).then(res=>{
        //3.去拿第一个菜单对应数据
        this._getSubcategories(0);
      })
    },
    methods:{
      /**
       * 菜单栏展示数据的构造函数
       */
      Type(){
        this.subcategories= null;
        this.categoryDetail ={'pop': null, 'new': null, 'sell': null}
      },
      /**
       * 获取菜单栏的数据，组件创建时会自动获取第一个菜单的数据
       * @param index:请求的是第index个菜单选项的数据
       *
       */
      _getSubcategories(index) {
        this.currentIndex = index;
        const maitKey = this.categories[index].maitKey;
        getSubcategory(maitKey).then(res => {
          this.categoryData[index].subcategories = res.data.list
        }).then(res=>{
          this._getCategoryDetail('pop');
          this._getCategoryDetail('new');
          this._getCategoryDetail('sell');
        })
      },
      /**
       * 获取分类子类中的详情数据
       * @param type：按类别请求详情数据
       */
      _getCategoryDetail(type){
        const miniWallkey = this.categories[this.currentIndex].miniWallkey;
        getCategoryDetail(miniWallkey, type).then(res => {
          console.log(res);
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          // this.categoryData = {...this.categoryData}  //这句是不是有毛病？
        })
      },
      /**
       * 选项卡切换时，更新对应的详情数据
       * @param index：详情索引
       */
      subTypeChanged(index){
        const arr = ['pop','new','sell'];
        this.subcategoryType = arr[index];
      }
    }
  }
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
  .main{
    position: absolute;
    top:44px;
    bottom: 49px;
    left: 0;
    right: 0;
    display: flex;
  }
  .main .main-right{
    flex: 1;
    height: 100%;
    overflow: hidden;
  }
</style>

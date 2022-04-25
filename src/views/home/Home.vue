<template>
  <div id="home">
    <!-- 头部 -->
    <nav-bar class="home-nav">
      <h2 slot="center">购物街</h2>
    </nav-bar>

     <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-contorl"
        v-show="isTabFixed"
      ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMoar"
    >
      <!-- 轮播 -->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 内容 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <!-- 流行 新款 精选 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- 商品内容 -->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isshowBackTop"></back-top>
  </div>
</template>
 
<script>
import { getHomeMultidata } from "network/home"; //网络请求
import { getHomeGoods } from "network/home"; //网络请求

import NavBar from "components/common/navbar/NavBar"; //头部公共组件组件
import TabControl from "components/content/tabControl/TabControl"; //流行  精选  新款 选项卡
import GoodsList from "components/content/goods/GoodsList"; //流行  精选  新款 选项卡
import Scroll from "components/common/scroll/Scroll"; //滑动
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper.vue"; //轮播图
import RecommendView from "./childComps/RecommendView.vue"; //轮播图下面的内容
import FeatureView from "./childComps/FeatureView.vue"; //本周流行

import {debounce} from "common/utils.js"//防抖
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      // 流行 新款 精选
      goods: {
        pop: { page: 0, list: [] }, //流行
        new: { page: 0, list: [] }, //新款
        sell: { page: 0, list: [] }, //精选
      },
      //默认展示类型为pop
      currentType: "pop",
      //返回顶部图标
      isshowBackTop: false,
      tabOffSetTop:0,
      isTabFixed:false,  //吸顶
      savaY:0,
      itemImgListener:null
    };
  },
  created() {
    // 1.调用请求多个数据方法
    this.getHomeMultidata();
    //2. 调用商品数据方法
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

  },
  // 组件销毁时自动触发的函数
  destroyed(){
    console.log("home---我销毁了");
  },
  // 活跃  
  activated(){
    // 进来时回到原来的位置    
    this.$refs.scroll.scrollTo(0,this.savaY,0)  //进来时返回离开时的位置y
    this.$refs.scroll.refresh()  //在进来时刷新一下   防止出现不能滚动的问题
  
  },
  //离开
  deactivated(){
    // 离开时保存位置
    this.savaY = this.$refs.scroll.getScrollY()  //获取离开时的y值
    // console.log('deactivated');

    // 2.离开时取消goositem图片的监听完成   这样做是为了detail详情页监听图片加载完成不需要告诉home  因为他俩用的同一个组件  所以这样做
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  mounted(){
    //因为图片没加载完  滚动的高度就会有问题   
    //1.图片加载完成的事件监听       防止加载完一个图片调用一次刷新  我们等全部加载完在调用刷新
    const refresh = debounce(this.$refs.scroll.refresh,50)
    //监听goodslistitem中图片加载完成      
    this.itemImgListener = ()=>{
      refresh() //调用防抖刷新
    }
    // this.$bus.$on('itemImageLoad',()=>{
    //   refresh() //调用防抖刷新
    // })
    this.$bus.$on('itemImageLoad', this.itemImgListener) 
   
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**事件监听 */
 
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //把index 双向赋值  把点击时的下标双向赋值   这样就可以关联tabControl1  
        this.$refs.tabControl1.currenIndex = index
      this.$refs.tabControl2.currenIndex = index
    },
    //返回顶部组件方法  通过ref调用子组件内部的scrollTo方法
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1500);
    },

    //监听滚动位置 控制返回顶部图标显示与隐藏
    contentScroll(position) {
      // console.log(position);
      //1. 判断BackTop图标是否显示
      this.isshowBackTop = (-position.y) > 1000;   //当大于1000时isshowBackTop为true  否则为false

      // 2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffSetTop; 
    },
    // 上拉加载更多
    loadMoar (){
      // 到底部的时候在获取一下数据
      this.getHomeGoods(this.currentType)
    },
   //监听轮播图加载完成  为了完成吸顶
   swiperImageLoad(){
       //获取tabControl组件的OffSetTop   所有组件都有一个$el属性  可以回去组件中的元素
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.$refs.tabControl.$el.offsetTop); 
   },
     
    /** 网络请求*/
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //请求商品数据
    getHomeGoods(type) {
      //获取page
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        // 上拉加载更多时页码+1
        this.goods[type].page += 1;
        //上拉加载一次后 继续上拉加载更多  主动调一次finishPullUp这个方法  才能加载下一次以及很多次
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style  scoped>
#home {
  /* padding-top: 44px; */
  position: relative;

  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 14px;

  /* 固定定位   在使用浏览器原生滚动时,为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 计算content高度   那么父盒子就要设置 height: 100vh; */
.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
} 
.tab-contorl {
  position: relative;
  z-index: 9;
}
/* .content{
   height: calc(100% -93px);
  overflow: hidden; 
} */
</style>
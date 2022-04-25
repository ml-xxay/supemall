<template>
  <div id="detail">
    <detail-nav-bar
      class="detaill-nav"
      @titelClick="titelClick"
      ref="detailNav"
    />

    <scroll
      class="detail-sc"
      ref="scroll"
      @scroll="contentSceoll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-params :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isshowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"; //头部导航
import DetailSwiper from "./childComps/DetailSwiper.vue"; //轮播图
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"; //商品内容
import DetailShopInfo from "./childComps/DetailShopInfo.vue"; //店铺信息
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"; //商品详情
import DetailParams from "./childComps/DetailParams.vue"; //参数
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"; //评论
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar.vue"; //底部

// import {debounce} from "common/utils.js"//防抖
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import { debounce } from "@/common/utils";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import Scroll from "../../components/common/scroll/Scroll.vue";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParams,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, backTopMixin],
  props: {},
  data() {
    return {
      iid: null,
      //轮播图数据
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themTopYs: [], //所有属性距离顶部的距离
      getThemeTopY: null,
      currentsIndex: 0,
      //  itemImgListener:null
    };
  },
  created() {
    // 1 拿到传过来的id  发送网络请求  渲染详情页
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息的数据
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //5.获取顶部参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取顶部评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      /*
      DOM没有渲染
      this.themeTopYs.push(0)
      this.themeTopYs.push(-this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(-this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(-this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);*/

      // this.$nextTick(() => {
      //   // 图片没有加载完成
      //   // this.themTopYs = []
      //   // this.themTopYs.push(0);
      //   // this.themTopYs.push(this.$refs.params.$el.offsetTop);
      //   // this.themTopYs.push(this.$refs.comment.$el.offsetTop);
      //   // this.themTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   //      console.log(this.themTopYs);
      // });
    });
    //3.请求推荐数据
    getRecommend().then((res) => {
      console.log(res);
      this.recommends = res.data.list;
    });

    // 给getThemeTopY赋值   请求完数据后  用防抖
    this.getThemeTopY = debounce(() => {
      this.themTopYs = [];
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themTopYs.push(Number.MAX_VALUE);
      console.log(this.themTopYs);
    }, 100);
  },
  mounted() {
    //这里不用了  是因为我们封装了混入    混入替代了这里的内容
    //  let refresh = debounce(this.$refs.scroll.refresh, 50);
    //   this.itemImgListener = () => {
    //       refresh() //调用防抖刷新
    //   }
    //   this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  // 组件销毁时
  destroyed() {
    // 2.销毁时取消goositem图片的监听完成
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    //监听图片加载完刷新
    imageLoad() {
      this.refresh(); //调用混入
      // this.$refs.scroll.refresh()  这个刷新也行   在子组件里面监听图片长度加载完  发送一次imageLoad事件
      this.getThemeTopY();
    },
    //监听导航栏的点击
    titelClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themTopYs[index], 50);
    },
    // 监听scroll的滚动滚动到哪里  导航自动跳到哪里
    contentSceoll(position) {
      // 获取y值   滚动到哪里  导航自动跳到哪里]    0, 6188, 6775, 6921,
      // console.log(position);
      const positionY = -position.y;
      // for(let i = 0; i < this.themTopYs.length; i++){// }
      // 用es6的循环
      for (let i = 0; i < this.themTopYs.length - 1; i++) {
        // let length = this.themTopYs.length;
        // console.log(i);  //这是this.themTopYs数组对应的索引
        //parseInt(i)
        //  console.log(this.themTopYs[i]);  //这是this.themTopYs数组 对应索引的值

        if (
          this.currentsIndex !== i &&
          positionY >= this.themTopYs[i] &&
          positionY < this.themTopYs[i + 1]
        ) {
          console.log(i);
          this.currentsIndex = i;
          this.$refs.detailNav.currentIndex = this.currentsIndex;
        }

        // if (this.currentsIndex !== i &&  (i < length - 1 &&
        //     positionY >= this.themTopYs[parseInt(i)] &&
        //     positionY < this.themTopYs[i + 1]) ||
        //   (i === length - 1 && positionY >= this.themTopYs[parseInt(i)])

        // ) {
        //   this.currentsIndex = i
        //   this.$refs.detailNav.currentIndex = this.currentsIndex
        // }
      }

      // 2.回到顶部   使用混入
      //判断BackTop图标是否显示
      // this.isshowBackTop = (-position.y) > 1000;   //当大于1000时isshowBackTop为true  否则为false
      
      // 直接调用混入
      this.demo(position);
    },
    //加入购物车
    addToCart() {
      // console.log("加入购物车");
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 将商品添加到vuex里面购物车里
      // this.$store.cartList.push(product)
      this.$store.dispatch("addCart", product).then(res =>{
        // console.log(res);
        this.$toast.show(res)
      });
    },
  },
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #ffffff;
}

.detaill-nav {
  position: relative;
  background-color: #ffffff;
}
.detail-sc {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
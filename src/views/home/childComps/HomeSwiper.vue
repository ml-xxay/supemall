<template>
<!-- 轮播图 -->
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },

  props: {
    // 用banners来接收  类型Array 没有值默认返还kong[]
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad:false
    };
  },
  created() {},
  methods: {
    // 监听图片加载完成
    imageLoad(){
      // console.log("加载完成了");
      if(!this.isLoad){
        
      this.$emit('swiperImageLoad')
      this.isLoad = true
      }
    }
  },
  
};
</script>
<style scoped>
</style>
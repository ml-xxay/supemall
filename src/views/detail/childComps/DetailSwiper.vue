<template>
 
     <swiper class="detail-swiper">
      <swiper-item  v-for="(item, index) in topImages" :key="index">
          <img class="adb" :src="item" alt="" >
      </swiper-item>
    </swiper>

</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper"; //导入轮播图公共组件
  export default {
    name: 'DetailSwiper',
    components:{
      Swiper,
      SwiperItem
    },
    props:{
      topImages:{
        type:Array,
        default() {
          return []
        }
      }
    },
    data(){
      return {
        
      }
    },
  created(){},
  methods:{},
  }
</script>
<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
.adb {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <div class="goods-item" @click="itemClick">
    <!-- 通过load可以监听图片是否加载完成 -->
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  components: {},
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed:{
    showImage(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  created() {},
  methods: {
    imageLoad() {
      //往事件总线bus里面发送一个监听方法
      this.$bus.$emit("itemImageLoad");

      // if(this.$router.path.indexOf('/home') !== -1){
      // this.$bus.$emit("homeItemImageLoad");
      // } else if (this.$router.path.indexOf('/detail')) {
      //   this.$bus.$emit("detailItemImageLoad")
      // }
    },
    // 跳转到详情页
    itemClick(){
      // console.log("跳转详情页");
      this.$router.push('/detail/'+ this.goodsItem.iid)    //push可以返回    把id传到详情页
    }
  },
};
</script>
<style scoped>
.goods-item {
  position: relative;

  padding-bottom: 40px;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
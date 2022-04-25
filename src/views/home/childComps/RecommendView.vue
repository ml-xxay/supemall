<template>
<!-- 内容 -->
  <div class="recommend">
    <div
      v-for="(item, index) in recommends"
      :key="index"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendView",
  components: {},
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.recommend {
  display: flex;
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recommend-item {
  /* 均等分 */
  flex: 1;
}
.recommend-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 8px;
}
</style>
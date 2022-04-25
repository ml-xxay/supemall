<template>
<!-- 流行 新款  精选 -->
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{ active: index === currenIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  components: {},
  props: {
    titles: {
      type: Array,
      defaule() {
        return [];
      },
    },
  },
  data() {
    return {
      currenIndex: 0,
    };
  },
  created() {},
  methods: {
    itemClick(index) {
      this.currrenIndex = index
      this.$emit('tabClick',index)
    },
  },
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}
.tab-control-item {
  flex: 1;
  /* border-bottom: 1px solid var(--color-tint); */
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>
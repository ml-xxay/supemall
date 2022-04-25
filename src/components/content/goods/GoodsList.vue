<template>
<!-- 流行 新款 精选商品列表组件 -->
   <div class="goods">
     <good-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></good-list-item>
  
   </div>
</template>
<script>
import GoodListItem from './GoodListItem.vue'
  export default {
    name: "GoodsList",
    components:{
      GoodListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
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
.goods {
  display: flex;
  flex-wrap: wrap;
    justify-content: space-around;
   padding: 2px;
}
</style>
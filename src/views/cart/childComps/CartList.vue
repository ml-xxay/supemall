<template>
   <div class="cart-list">
    <scroll class="content" ref="scroll"> 
      <cart-list-item v-for="(item,index) in cartList" 
      :key="index"
      :item="item"
      />
    </scroll>
   </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Scroll from '../../../components/common/scroll/Scroll.vue';
  import CartListItem from "./CartListItem";
  export default {
    name: 'CartList',
    components:{
      Scroll,
      CartListItem,
    },
    props:{
      
    },
    data(){
      return {
        
      }
    },
     computed:{
       ...mapGetters(['cartList'])
    },
  created(){},
  methods:{},
  // 活跃时
  activated(){
    // console.log("我我我我");
    this.$refs.scroll.refresh()
  }
  }
</script>
<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
    overflow: hidden;
}
</style>
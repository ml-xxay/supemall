<template>
<!-- 详情页导航 -->
   <div>
      <nav-bar>
       <div slot="left"  @click="backClick"><i class="el-icon-arrow-left"></i></div>
       <div slot="center" class="title">
         <div v-for="(item,index) in titlse" :key="index" 
         class="title-item"
         :class="{active:index === currentIndex}"
         @click="titleClick(index)"
         >{{item}}
         </div>
       </div>
     </nav-bar>
   </div>
</template>
<script>

import NavBar from 'components/common/navbar/NavBar.vue'
  export default {
    name: 'DetailNavBar',
    components:{
      NavBar
    },
    props:{},
    data(){
      return {
        titlse:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
  created(){},
  methods:{
    titleClick(index){
      this.currentIndex = index
      this.$emit('titelClick',index)
    },
    // 返回上一层
    backClick (){
     this.$router.back()
    }
  },
  }
</script>
<style scoped>
.title {
  display: flex;
  font-size: 14px;
}
.title-item {
  flex: 1;
}
.active {
     color: var(--color-high-text);
}
</style>
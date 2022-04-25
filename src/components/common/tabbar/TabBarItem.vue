<template>
 
         <div class="tab-bar-item" @click="itemClick">
             <!-- 图片 -->
           <!-- <div>首页</div> -->
             <!-- <slot name="item-icon"></slot>
             <slot name="item-text"></slot> -->
             <div v-if="!isActive"><slot  name="item-icon"></slot></div>
            <div v-else><slot name="item-icon-active"></slot></div>
            <div :style="activeStyle">
              <slot  name="item-text"></slot>
            </div>
         </div>
    
</template>

<script>
export default{
    name:"TabBarItem",
     props:{
          path:String,
          activeColor:{
            type:String,
            default:'red'
          }
        },
    data (){
      return {
        //  isActive:false,
      }
    },
    methods:{
      itemClick (){
        // replace  跳转之后浏览器不带返回    push  跳转之后浏览器带返回
        this.$router.replace(this.path).catch(err=>err)
      }
    },
    computed: {
      isActive (){
        // this.$router.path.indexOf(this.path) !==-1   
        // 这句话的意思是  拿到处于活跃路由的path(this.$router.path)  调用indexof这个方法  处于活跃的路由有没有我的path(this.path)
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle (){
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
/* 图片样式 */ 
 /* vertical-align:middle;    */
   /*去除图片下面的预留空间 */
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 6px;
  vertical-align:middle;   
  margin-bottom:2px;
}
/* .active {
  color: red;
} */
</style>
<template>
   <div class="wrapper" ref="wrapper">
     <div class="content">
       <slot></slot>
     </div>
   </div>
</template>
<script>
import Bscroll from "better-scroll"
  export default {
    name: 'Scroll',
    components:{},
    props:{
      probeType:{
        type:Number,
        default:0
      },
        pullUpLoad: {
          type:Boolean,
          default:false
        }
    },
    data(){
      return {
        scroll:null,  //这是 mounted方法里面 Bscroll的实例
      
      }
    },
  created(){},
 
  mounted(){

    //1 创建bscroll对象
    
    this.scroll = new Bscroll(this.$refs.wrapper,{
      disableTouch: false,
      observeDOM:true,
       click: true, //允许点击事件
      probeType: this.probeType, //实时监听滚动位置 0默认不监听  1不监听 2监听但鼠标离开的惯性滑动不监听
     
      pullUpLoad: this.pullUpLoad, //上拉加载更多
    })

    //2.监听滚动位置
    this.scroll.on('scroll',(position)=>{
     
      this.$emit('scroll',position) 
    })

    //3.加载更多监听滚到底部  在上拉加载更多数据(pullingUp)调用这个方法加载更多
     if(this.pullUpLoad) {
       this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
    }
   
  },
   methods:{
    // 封装一个方法   回到顶部
    scrollTo(x,y,time){
     this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time)
    },
    // 封装继续上拉加载更多
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()  //调用bscroll实例的方法
    },
    //封装刷新方法
    refresh(){
      console.log('----');
     this.scroll && this.scroll.refresh()
    },
    // 获取当前的滚动y
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
    
  }
  }
</script>
<style scoped>

</style>
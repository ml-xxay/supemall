<template>
   <div class="bottom-bar">
     <div class="conent">
       <check-button :is-check="isSelectAll" @click.native="quanxuan"  class="a"/>
       <span class="b">全选</span>
     </div>
     <div class="c">
       合计:{{totalPrice}}
     </div>
     <div class="calculate" @click="jisuan">
       去计算({{ checkLength }}) 
     </div>
   </div>
</template>
<script>
import CheckButton from '../../../components/content/checkButton/CheckButton.vue';
  export default {
    name: 'CartBottomBar',
    components:{
      CheckButton
    },
    props:{
        CheckButton},
    data(){
      return {
        
      }
    },
    computed:{
      totalPrice(){
        return this.$store.state.cartList.filter(item =>{ 
          return item.checked   //filter只返回为true的
        }).reduce((preValue,item)=>{
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => item.checked).length

      },
      // 是否全选
      isSelectAll(){
        // 第一种方式
        // if(this.$store.state.cartList.length ===0) return false
        // return !(this.$store.state.cartList.filter(item =>!item.checked).length)

        // 第二种
        if(this.$store.state.cartList.length ===0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
       
      }
    },
  created(){},
  methods:{
    quanxuan(){
      // 如果全部选中  点击变为全都不选中
      if(this.isSelectAll) {
        this.$store.state.cartList.forEach(item => {
          item.checked = false
        });
      }else {
        // 有部分或全部没选中的  点击变为全部选中
         this.$store.state.cartList.forEach(item => {
          item.checked = true
        });
      }
    },
    jisuan(){
      if(!this.isSelectAll) {
        this.$toast.show('请先选择商品')
      }
    }
  },
  }
</script>
<style scoped>
.bottom-bar {
    display: flex;
    justify-content:space-between;
  height: 40px;
  background-color:#eee;
  position: relative;

  
}
.conent {
  display: flex;
}
.a {
  height: 20px;
  width: 20px;
  margin: 10px 0;
}
.b {
  width: 40px;
 line-height: 40px;
  
}
.c {
  width: 150px;
/* margin-top: 12px; */
line-height: 40px;
padding-left:10px ;
}
.calculate {
  width: 90px;
  line-height: 40px;
  background: crimson;
  color: #fff;
  text-align: center;
}
</style>
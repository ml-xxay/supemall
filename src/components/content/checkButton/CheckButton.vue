<template>
   <div class="check-button" :class="{check:isCheck}">
     <img src="~assets/img/cart/tick.svg" alt="">
   </div>
</template>
<script>
  export default {
    name: 'CheckButton',
    components:{},
    props:{
      isCheck:{
        type:Boolean,
        default:false
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
.check-button {
  height: 20px;
  width: 20px;
  margin-top: 30px;
  border-radius: 50%;
  border: 2px solid #aaa;
  line-height: 50%;
}
.check{
  border-color: red;
  background-color: red;
}
</style>
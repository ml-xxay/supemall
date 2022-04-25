<template>
   <div class="toast" v-show="isshow">
      <div>{{ message }}</div>
   </div>
</template>
<script>
  export default {
    name: 'Toast',
    components:{},
    props:{
      // message:{
      //   type:String,
      //   default:''
      // }
      // ,
      // show:{
      //   type:Boolean,
      //   default:false
      // }
    },
    data(){
      return {
        message:'',
        isshow:false
      }
    },
  created(){},
  methods:{
    show(message,dueation=2000) {
      this.isshow = true;
      this.message = message

      setTimeout(()=>{
        this.isshow = false;
         this.message = ''
      },dueation)
    }
  },
  }
</script>
<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 10px 10px;
  z-index: 999;
  transform:translate(-50%,-50%);
  color: #fff;
  background-color: rgba(0, 0, 0,0.7);
}
</style>
<template>
  <div id="toast">{{message}}</div>
</template>

<script>
  export default {
    name: "toast",
    props:{
      message:String
    },
    methods:{
      fade(){
        const aim = document.querySelector('#toast');
        aim.style.opacity = '1';
        setTimeout(()=>{
          aim.style.transition = 'opacity 0.5s ease 0.5s';
          aim.style.opacity = '0';
          setTimeout(()=>{
            aim.style.transition = '';
          },1000)
        })
      }
    }
  }
</script>

<style scoped>
  #toast{
    background-color: rgba(0,0,0,0.75);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 10px;
    font-size: 18px;
    color: #fff;
    opacity: 0;
  }
</style>

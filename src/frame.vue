<template>
  <transition  name="fade"
               enter-class="fade-in-enter"
               enter-active-class="fade-in-active"
               leave-class="fade-out-enter"
               leave-active-class="fade-out-active" appear>
    <router-view></router-view>
  </transition>
</template>

<script>
    export default{
        name:'frame'
    }
</script>

<style>
   .fade-in-active,  .fade-out-active{transition: all 0.5s ease }

 .fade-in-enter,  .fade-out-active{
   opacity: 0
 }




</style>

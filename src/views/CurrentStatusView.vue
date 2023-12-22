<template>
    <div class="home">
      <NavbarComp/>
      <CurrentStatusComp/>
      
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import CurrentStatusComp from '@/components/CurrentStatusComp.vue'
  import NavbarComp from '@/components/NavbarComp.vue'
 
  
  export default {
    name: 'CurrentStatusView',
    components: {
      CurrentStatusComp,
      NavbarComp,
     
  }
  }
  </script>
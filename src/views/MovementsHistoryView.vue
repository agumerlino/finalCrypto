<template>
    <div class="home">
      <NavbarComp/>
      <MovementsHistoryComp/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import MovementsHistoryComp from '@/components/MovementsHistoryComp.vue'
  import NavbarComp from '@/components/NavbarComp.vue'
 
  
  export default {
    name: 'MovementsHistoryView',
    components: {
      MovementsHistoryComp,
      NavbarComp,
  }
  }
  </script>
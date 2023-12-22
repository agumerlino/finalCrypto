<template>
  <div class="home">
    <NavbarComp />
    <h1 class="title">Profit</h1>
      <ProfitComp />
  </div>
</template>

<script>
// @ is an alias to /src

import NavbarComp from "@/components/NavbarComp.vue";
import ProfitComp from "@/components/ProfitComp.vue";

export default {
  name: "ProfitView",
  components: {
    NavbarComp,
    ProfitComp
},
};
</script>
<template>
  <div>
    <NavbarComp/>
    <LoginComp/>
  </div>
</template>

<script>
import LoginComp from "@/components/LoginComp.vue";
import NavbarComp from '@/components/NavbarComp.vue'

export default {
  name: 'LoginView',
  components: {
    LoginComp,
    NavbarComp
  }
};
</script>

<template>
    <div class="home">
        <NavbarComp/>
        <TradeComp/>
    </div>
</template>

<script>
import TradeComp from '@/components/TradeComp.vue'
import NavbarComp from '@/components/NavbarComp.vue'


export default {
    name: 'TradeView',
    components: {
        TradeComp,
        NavbarComp,
        }
}
</script>
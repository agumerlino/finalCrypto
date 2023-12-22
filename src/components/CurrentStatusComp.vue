<template>
    <h1 class="title">Your cryptos</h1>
     <div class="tableAmounts">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Coins</th>
                        <th scope="col">Coin's Amount</th>
                        <th scope="col">Total Money amount (sale price)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="crypto of cryptoList" :key="crypto.id">
                        <td class="tg-kxt4">{{crypto.name}}</td>
                        <td class="tg-kxt4">{{Number(crypto.amount).toLocaleString()}}</td>
                        <td class="tg-kxt4">$ {{Number(crypto.amountInMoney).toLocaleString()}}</td>
                    </tr>
                </tbody>
            </table>
     </div>
</template>
<script>
import UserService from '@/services/UserService';
export default {
    name: "CurrentStatus",
    data(){
        return {
            cryptoList: this.$store.state.cryptos,      
            }
    }, 
    mounted(){
        if (this.$store.state.username === ''){
                alert("you must log in");
                this.$router.push("/")
            }
        this.cryptoList.forEach(element => {
            UserService.getCryptoData(element.symbol).then((res)=>{
                element.amountInMoney = res.data.totalBid * element.amount;
                element.result = (element.sales- element.purchases) + element.amountInMoney;
            })
        });
    },
}
</script>

<style scoped>
.tableAmounts{
   width: 80%;
   margin-left: auto;
   margin-right: auto;
   margin: 2% auto 0 auto;

}
.title{
    margin: 5% 0 0 0;
    display: flex;
    justify-content: center;
}
.table {
  border-collapse: collapse;
  width: 100%;
}
.table th, .table td {
  padding: 8px;
  text-align: center;
}
.table th {
  background-color: #D6EAF8; /* Color de fondo para las celdas de encabezado */
}
.table tbody tr:nth-child(odd) {
  background-color: #EBF5FB; /* Color de fondo para filas impares del cuerpo de la tabla */
}
</style>
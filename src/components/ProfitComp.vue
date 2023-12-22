<template>
  <div>
    <div class="tableAmounts">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Coin</th>
            <th scope="col">Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="profitItem in profitList" :key="profitItem.id">
            <td class="tg-kxt4">{{ profitItem.name }}</td>
            <td class="tg-kxt4">$ {{ Number(profitItem.result).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "ProfitView",
  data() {
    return {
      profitList: [],
    };
  },
  mounted() {
    if (this.$store.state.username === "") {
      alert("you must log in");
      this.$router.push("/");
    }
    if (this.$store.state.cryptos && this.$store.state.cryptos.length > 0) {
      this.profitList = this.$store.state.cryptos.map((crypto) => ({
        id: crypto.id,
        name: crypto.name,
        result: crypto.result,
      }));

      // Aquí puedes realizar cualquier otra lógica necesaria
      this.profitList.forEach((element) => {
        if (element.symbol) {
         UserService.getCryptoData(element.symbol).then((res) => {
          element.amountInMoney = res.data.totalBid * element.amount;
          element.result = (element.sales - element.purchases) + element.amountInMoney;
        });
      }});
    }
  },
};
</script>

<style scoped>
.tableAmounts {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin: 2% auto 0 auto;
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
.title {
  margin: 5% 0 0 0;
  display: flex;
  justify-content: center;
}
</style>
<template>
  <div>
    <h1 class="title">Trade</h1>

    <div class="trade">
      <!-- Buy Section -->
      <div class="trade-section">
        <select class="form-select" @change="onChangeBuy($event)">
          <option class="optionCoin" value="" selected>Coin</option>
          <option v-for="crypto in cryptos" :key="crypto.id">{{ crypto.symbol }}</option>
        </select>
        <br />
        <input class="form-control" type="number" v-model="amountToBuy" />
        <br />
        <button class="buyandsellButton" @click="newBuy">Buy</button>
      </div>
    
      <div class="card text-bg-light" style="width: 10rem; height: 10rem;">
        <div class="card-header">{{ action }}</div>
        <div>
          <p>{{ keyWord }}</p>
          <h5 class="card-title" v-for="crypto in cryptos" :key="crypto.id">
            {{
              (coinSelectedToBuy === crypto.symbol && action === "Buy")
                ? (amountToBuy === "" || amountToBuy === null
                    ? " 1 " + coinSelectedToBuy + " = AR $ " + buyPrice
                    : amountToBuy + " " + coinSelectedToBuy + " = AR $ " + (buyPrice * amountToBuy).toLocaleString())
                : (action === "Sell" && coinSelectedToSell === crypto.symbol)
                  ? (amountToSell === "" || amountToSell === null
                      ? " 1 " + coinSelectedToSell + " = AR $ " + salePrice
                      : amountToSell + " " + coinSelectedToSell + " = AR $ " + (salePrice * amountToSell).toLocaleString())
                  : ""
            }}
          </h5>
        </div>
      </div>

    
      <div class="trade-section">
        <select class="form-select" @change="onChangeSell($event)">
          <option class="optionCoin" value="" selected>Coin</option>
          <option v-for="crypto in cryptos" :key="crypto.id">{{ crypto.symbol }}</option>
        </select>
        <br/>
        <input class="form-control" type="number" v-model="amountToSell" />
        <br/>
        <button class="buyandsellButton" @click="newSell" :disabled="!amountToSell">Sell</button>
      </div>
    </div>
  </div>

</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "TradeComp",
  data() {
    return {
      cryptos: UserService.cryptos,
      amountToBuy: null,
      amountToSell: null,
      coinSelectedToBuy: null,
      coinSelectedToSell: null,
      nameCoin: null,
      buyPrice: null,
      salePrice: null,
      action: "Action",
      keyWord: "Price in AR$",
      purchase: {
        user_id: "",
        action: "",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
      },
      sell: {
        user_id: "",
        action: "",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
      }
    };
  },
  
  mounted(){
      if (this.$store.state.username === ''){
          alert("you must log in");
          this.$router.push("/")
      }
  },
  methods: {
    onChangeBuy(event) {
      if (event.target.value !== "") {
        this.coinSelectedToBuy = event.target.value;
        UserService.getCryptoData(this.coinSelectedToBuy)
          .then((response) => {
            this.buyPrice = response.data.totalAsk;
          })
          .catch((e) => {
            console.log(e);
          });
        this.action = "Buy";
        this.keyWord = "Purchase price in AR$";
      } else {
        this.action = "";
        this.keyWord = "Price in AR$";
      }
    },
    onChangeSell(event) {
      if (event.target.value !== "") {
        this.coinSelectedToSell = event.target.value;
        UserService.getCryptoData(this.coinSelectedToSell)
          .then((response) => {
            this.salePrice = response.data.totalBid;
          })
          .catch((e) => {
            console.log(e);
          });
        this.action = "Sell";
        this.keyWord = "Sale price in AR$";
      } else if (event.target.value === "") {
        this.action = "";
        this.keyWord = "Price in AR$";
      }
    },
    newBuy() {
        if(this.amountToBuy && this.coinSelectedToBuy !== null){
      this.purchase.user_id = this.$store.state.username;
      this.purchase.crypto_code = this.coinSelectedToBuy;
      this.purchase.crypto_amount = this.amountToBuy.toFixed(2);
      this.purchase.money = (this.buyPrice * this.amountToBuy).toFixed(2).toString();
      this.purchase.action = "purchase";
      this.purchase.datetime =  Date.now();

      UserService.newTrade(this.purchase);
      this.$store.commit("newPurchase", this.purchase);
      alert("Successful purchase");
      this.$router.push("/estadoActual");
    }},

    newSell() {
    
    if(this.amountToSell && this.coinSelectedToSell !== null){
      let validationAmountCrypto = UserService.cryptos.find(x => x.symbol === this.coinSelectedToSell);

      if (this.amountToSell > validationAmountCrypto.amount) {
        alert("You can't sell that amount");
        this.$router.push("/trade");
      } else {
        this.sell.user_id = this.$store.state.username;
        this.sell.crypto_code = this.coinSelectedToSell;
        this.sell.crypto_amount = this.amountToSell.toFixed(2);
        this.sell.money = (this.salePrice * this.amountToSell).toFixed(2).toString();
        this.sell.action = "sale";
        this.sell.datetime =  Date.now();
        UserService.newTrade(this.sell);
        alert("Successful sale");
        this.$store.commit("newSale", this.sell);
        this.$router.push("/estadoActual");

      }
    }
    },
  },
};
</script>

<style scoped>
.trade {
  display: flex;
  justify-content: space-evenly;
  margin: 10% 0 5% 0;
  background-color: #E8F8F5; 
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;

}
.form-select {
     padding: 10px;
    margin: 15px;
}
.form-control {
  padding: 5px;
  margin-bottom: 15px;
}
.buyandsellButton {
 
  padding: 5px;
  background-color: #A9DFBF;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  margin-right: 3px;
  
  
}

.trade-section {
  background-color: #E8F8F5;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;

}

.title{
  margin: 5% 0 0 0;
  display: flex;
  justify-content: center;
}
</style>

import UserService from '@/services/UserService';
import { createStore } from 'vuex'

export default createStore({
  state: {
    username: "",
    cryptos: UserService.cryptos,
  },
  getters: {},
  mutations: {
    newUser(state, username) {
      state.username = username;
    },
    newSale(state, sale){
      var money = parseFloat(sale.money)
      var amount = parseFloat(sale.crypto_amount);
     state.cryptos.find(x => x.symbol === sale.crypto_code).sales += money;
     state.cryptos.find(x => x.symbol === sale.crypto_code).amount -= amount;
     
    },
    newPurchase(state, sale){
      var money = parseFloat(sale.money)
      var amount = parseFloat(sale.crypto_amount);
     state.cryptos.find(x => x.symbol === sale.crypto_code).purchases += money;
     state.cryptos.find(x => x.symbol === sale.crypto_code).amount += amount;
     
    },   
    
  },
  actions: {},
  modules: {},
});
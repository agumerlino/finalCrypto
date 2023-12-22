import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://laboratorio3-5fc7.restdb.io/rest/",
	headers: {'x-apikey': '64bdbc3386d8c5613ded91e7'}
});

export default {

    newTrade(newTrade) {
        return apiClient.post("/transactions", newTrade);
    },
    getMovements(username) {
      return apiClient.get(`/transactions?q={"user_id": "${username}"}`);
    },
    getMovementById(id) {
      return apiClient.get(`/transactions/${id}`);
    },
    updateMovement(id, transEdit) {

      return apiClient.put(`/transactions/${id}`, transEdit);
    },
    deleteMovement(id) {
      return apiClient.delete(`/transactions/${id}`);
    },

    getCryptoData(coin){
      return axios.get("https://criptoya.com/api/buenbit/"+coin+"/ars/0.1")
    },
  
    cryptos: [
      { id: 0, name: "Bitcoin", symbol: "BTC", amount: 0,sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
      { id: 1, name: "Ethereum", symbol: "ETH", amount: 0,sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
      { id: 2, name: "Dai", symbol: "DAI", amount: 0,sales: 0, purchases: 0, amountInMoney: 0, result: 0 },
    ],
    
  }
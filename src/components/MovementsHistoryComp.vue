<template>
  <div>
    <h1 class="title">Movements History</h1>
    <div class="tableMovements">
      <table class="table table-striped">
       <thead>
          <tr>
            <th scope="col">Action</th>
            <th scope="col">Coin</th>
            <th scope="col">Amount</th>
            <th scope="col">Money (ARS)</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movement in movements" :key="movement._id">
            <td>
              <template v-if="isEditing && movement._id === selectedMovement._id">
                <select v-model="editedMovement.action">
                <option value="purchase">Purchase</option>
                <option value="sale">Sale</option>
                 
                </select>
              </template>
              <template v-else>
                {{ movement.action }}
              </template>
            </td>
            <td>
                <template v-if="isEditing && movement._id === selectedMovement._id">
                    <select v-model="editedMovement.crypto_code">
                    <option v-for="crypto in availableCryptos" :key="crypto.symbol" :value="crypto.symbol">{{ crypto.symbol }}</option>
                    </select>
                </template>
                <template v-else>
                    {{ movement.crypto_code }}
                </template>
             </td>
             <td>
              <template v-if="isEditing && movement._id === selectedMovement._id">
                <input type="number" v-model="editedMovement.crypto_amount" step="0.01" />
              </template>
              <template v-else>
                {{ parseFloat(movement.crypto_amount).toFixed(2) }}
              </template>
            </td>
            <td>
              <template v-if="isEditing && movement._id === selectedMovement._id">
                <input type="number" v-model="editedMovement.money" step="0.01" />
              </template>
              <template v-else>
                {{ parseFloat(movement.money).toFixed(2) }}
              </template>
            </td>
            <td>
              <template v-if="isEditing && movement._id === selectedMovement._id">
                <input type="datetime-local" v-model="editedMovement.datetime" />
              </template>
              <template v-else>
                {{ formatDatetime(movement.datetime) }}
              </template>
            </td>
            <td>
              <template v-if="isEditing && movement._id === selectedMovement._id">
                <button class="movHist" @click="saveEdit">Save</button>
                <button class="movHist" @click="cancelEdit">Cancelar</button>
              </template>
              <template v-else>
                <button class="movHist" @click="showDetails(movement)">Details</button>
                <button class="movHist" @click="editMovement(movement)">Edit</button>
                <button class="movHist" @click="deleteMovement(movement)">Delete</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="showDetailsSection"  class="detailsSection">
      <h2>Movement details</h2>
      <p><strong>Action:</strong> {{ movementDetails.action }}</p>
      <p><strong>Coin:</strong> {{ movementDetails.crypto_code }}</p>
      <p><strong>Amount:</strong> {{ parseFloat(movementDetails.crypto_amount).toFixed(2) }}</p>
      <p><strong>Money (ARS):</strong> {{ parseFloat(movementDetails.money).toFixed(2) }}</p>
      <p><strong>Date:</strong> {{ formatDatetime(movementDetails.datetime) }}</p>
      <button class="movHist" @click="hideDetailsSection">Close details</button>
    </div>
    </div>
  </div>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "MovementsHistoryComp",
  data() {
    return {
      movements: [],
      selectedMovement: null,
      isEditing: false,
      editedMovement: {},
      showDetailsSection: false,
      movementDetails: {},
    };
  },
  mounted() {
    this.fetchMovements();
    if (this.$store.state.username === ''){
                alert("you must log in");
                this.$router.push("/")
            }
    UserService.getMovements(this.$store.state.username).then((res) => {
                this.investmentHistory = res.data
                this.availableCryptos = UserService.cryptos;
            })
    .catch(error => {
      console.error("Error fetching crypto data", error);
    }
   
    );
  },
  methods: {
    fetchMovements() {
      const username = this.$store.state.username;
      UserService.getMovements(username)
        .then((response) => {
          this.movements = response.data;
        })
        .catch((error) => {
          console.error("Error fetching movements", error);
        });
    },
    showDetails(movement) {
      UserService.getMovementById(movement._id)
        .then((response) => {
          this.movementDetails = response.data;
          this.showDetailsSection = true;
        })
        .catch((error) => {
          console.error("Error fetching movement details", error);
        });
    },

    hideDetailsSection() {
      this.showDetailsSection = false;
      this.movementDetails = {};
    },
     editMovement(movement) {
      this.editedMovement = { ...movement };
      this.selectedMovement = movement;
      this.isEditing = true;
    },
    saveEdit() {
      UserService.updateMovement(this.selectedMovement._id, this.editedMovement)
        .then(() => {
          this.fetchMovements();
          this.isEditing = false;
          this.selectedMovement = null;
          this.editedMovement = {};
        })
        .catch((error) => {
          console.error("Error updating movement", error);
        });
    },
    cancelEdit() {
      this.isEditing = false;
      this.selectedMovement = null;
      this.editedMovement = {};
    },
    deleteMovement(movement) {
      const confirmDelete = confirm("¿You sure to delete this move?");
      if (confirmDelete) {
        UserService.deleteMovement(movement._id)
          .then(() => {
            this.fetchMovements();
          })
          .catch((error) => {
            console.error("Error deleting movement", error);
          });
      }
    },
    formatDatetime(datetime) {
      const date = new Date(datetime);
      return date.toLocaleString();
    },
  },
};
</script>

<style scoped>
.tableMovements {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin: 2% auto 0 auto;
}

.title {
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

.movHist {
 
  padding: 5px;
  background-color: #A9DFBF;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  margin-right: 3px;
  
  
}

.table th {
  background-color: #D6EAF8; 
}

.table tbody tr:nth-child(odd) {
  background-color: #EBF5FB;
}

.detailsSection {
  background-color: #E8F8F5; 
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
}

.detailsSection h2 {
  color: #212F3D; /* Color de texto para el título */
}


</style>
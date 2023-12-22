<template>
  <div>
    <h2 class="login-title">Login</h2>
    <form v-on:submit.prevent="createUser" class="login-form">
      <label for="username" class="login-label">User:</label>
      <input type="text" id="username" v-model="username" required class="login-input" />
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    };
  },
  methods: {
    createUser: function() {
      if (this.username === " ") {
        alert("Error, cannot be empty");
        this.$router.push("/");
      } else {
        this.$store.commit("newUser", this.username);
        alert('¡Successful login!');
        this.$router.push("/trade");
      }
      
    },
  },
};
</script>

<style scoped>
.login-title {
  margin: 40px 0 0;
}

.login-form {
  margin: 40px 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-label {
  margin-bottom: 10px;
}

.login-input {
  padding: 5px;
  margin-bottom: 15px;
}

.login-button {
 
  padding: 10px;
  background-color: #333;
  color: white;
  border-radius: 5px;
   border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #DC7633;
}
</style>





<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/trade" class="nav-link">Trade</router-link></li>
      <li><router-link to="/estadoActual" class="nav-link">CurrentStatus</router-link></li>
      <li><router-link to="/historial" class="nav-link">MovementsHistory</router-link></li>
      <li><router-link to="/profit" class="nav-link">Profit</router-link></li>
      
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavbarComp"
};
</script>

<style scoped>
.navbar {
  background-color: #148F77;
  color: white;
  padding: 10px;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #A9DFBF; 
}

/* Puedes agregar más estilos según tus preferencias */
</style>
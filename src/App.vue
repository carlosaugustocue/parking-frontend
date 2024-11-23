<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand"><h1 id="principal-title">Parking</h1></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/entry" class="nav-link">Registrar Entrada</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/exit" class="nav-link">Registrar Salida</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">Estado del Parqueadero</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  text-decoration: none;
  list-style: none;
  font-family: "Poppins", serif;
  -webkit-font-smoothing: antialiased; /* Para navegadores basados en WebKit */
  -moz-osx-font-smoothing: grayscale; /* Para Firefox en macOS */
}

.navbar {
  background-color: #181818;
  margin-bottom: 10px;
  padding: 20px;
}

.nav-link {
  color: #fff;
}

/* Estilo para el enlace activo en la navegación */
.nav-link.router-link-exact-active {
  color: #332FF6 !important;
  font-weight: 600;
}

#principal-title {
  color: #fff;
  font-weight: 700;
  /* mover hacia la derecha proporcional al contenedor */
  margin-left: 30%;
}

#navbarNav {
  margin-right: 5%;
}

/* Se borraron todos los estilos con nombre Fira-sans */

.placa-salida {
  display: inline-block;
  padding: 6px 10px;
  font-weight: bold;
  font-size: 1.4rem;
  background-color: #ffdd00; /* Color amarillo como una placa */
  color: #161a1d; /* Color de texto oscuro */
  border: 1px solid #161a1d; /* Borde oscuro */
  border-radius: 5%;
  letter-spacing: 1px;
  text-align: center;
}

.placa-salida::before,
.placa-salida::after {
  content: "•";
  margin: 0 2px;
  color: #161a1d; /* Color de los puntos al lado de la placa */
}

</style>

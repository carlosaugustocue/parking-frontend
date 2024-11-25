<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <!-- Título dinámico del parqueadero -->
        <router-link to="/" class="navbar-brand">
          <h1 id="principal-title">{{ nombreParqueadero }}</h1>
        </router-link>
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
            <li class="nav-item">
              <router-link to="configuration" class="nav-link">Configuracíon</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Spinner -->
    <loading v-model:active="loading" :is-full-page="true" />

    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Loading from "vue-loading-overlay"; // Importa el componente
import "vue-loading-overlay/dist/css/index.css"; // Importa los estilos

export default {
  name: "App",
  components: {
    Loading, // Registra el componente
  },
  setup() {
    const nombreParqueadero = ref("Cargando...");
    const loading = ref(true); // Estado para mostrar/ocultar el spinner

    const obtenerNombreParqueadero = async () => {
      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_BASE_URL}/api/configuracion/nombre-parqueadero`
        );
        if (!response.ok) {
          throw new Error("Error al obtener el nombre del parqueadero.");
        }
        const data = await response.json();
        nombreParqueadero.value = data.nombreParqueadero || "Nombre no disponible";
      } catch (error) {
        console.error("Error al cargar el nombre del parqueadero:", error);
        nombreParqueadero.value = "Error al cargar";
      } finally {
        // Oculta el spinner cuando termina la carga
        loading.value = false;
      }
    };

    // Ejecuta la función al montar el componente
    onMounted(obtenerNombreParqueadero);

    return {
      nombreParqueadero,
      loading,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

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
  padding: 3px;
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
  margin-left: 0%;
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

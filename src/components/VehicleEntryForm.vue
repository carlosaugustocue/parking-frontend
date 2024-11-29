<template>
  <div class="home">
    <div class="container-form">
      <form class="form" @submit.prevent="registerVehicle">
        <h1 class="form-title">Registrar Entrada de Vehículo</h1>

        <!-- Campo para la placa -->
        <label for="placa" class="info-inputField">Placa</label>
        <input
          v-model="placa"
          type="text"
          id="placa"
          class="inputField"
          placeholder="Ej: ABC123"
          required
        />

        <!-- Campo para el tipo de vehículo -->
        <label for="tipoVehiculo" class="info-inputField">Tipo de Vehículo</label>
        <select
          v-model="tipoVehiculo"
          id="tipoVehiculo"
          class="inputField"
          required
        >
          <option value="" disabled selected>Selecciona el tipo de Vehículo</option>
          <option v-for="tipo in tiposVehiculo" :key="tipo" :value="tipo">
            {{ tipo }}
          </option>
        </select>

        <!-- Mensaje de estado -->
        <div class="feedback-container" v-if="message">
          <p class="feedback-message">{{ message }}</p>
        </div>

        <!-- Botón para registrar -->
        <button type="submit" class="form-btn">Registrar</button>
      </form>
    </div>

    <!-- Spinner global -->
    <loading v-model:active="cargando" :is-full-page="true" color="#0072ff" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  components: {
    Loading,
  },
  setup() {
    const placa = ref("");
    const tipoVehiculo = ref("");
    const tiposVehiculo = ref([]);
    const message = ref("");
    const cargando = ref(false);

    const obtenerTiposVehiculos = async () => {
      cargando.value = true;
      try {
        const response = await fetch(
          "http://localhost:8080/api/configuracion/tarifas"
        );
        if (!response.ok) {
          throw new Error("Error al obtener los tipos de vehículos.");
        }
        const data = await response.json();
        tiposVehiculo.value = data.map((tarifa) => tarifa.tipoVehiculo);
      } catch (error) {
        console.error("Error al cargar los tipos de vehículos:", error);
      } finally {
        cargando.value = false;
      }
    };

    const registerVehicle = async () => {
      cargando.value = true;
      message.value = "";
      try {
        const response = await fetch(
          "http://localhost:8080/api/vehiculos/entrada",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              placa: placa.value,
              tipoVehiculo: tipoVehiculo.value,
            }),
          }
        );
        const data = await response.json();
        message.value = data.mensaje;
      } catch (error) {
        console.error("Error al registrar el vehículo:", error);
        message.value = "Error al registrar el vehículo.";
      } finally {
        cargando.value = false;
      }
    };

    onMounted(obtenerTiposVehiculos);

    return {
      placa,
      tipoVehiculo,
      tiposVehiculo,
      registerVehicle,
      message,
      cargando,
    };
  },
};
</script>

<style scoped>
/* Fondo con degradado animado */
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(45deg, #0072ff, #00c6ff);
  background-size: 200% 200%;
  animation: gradientAnimation 6s ease infinite;
  padding: 20px;
}

/* Animación del fondo */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Contenedor del formulario */
.container-form {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 30px;
  width: 400px;
}

/* Título del formulario */
.form-title {
  font-size: 2rem;
  font-weight: bold;
  color: #0072ff;
  text-align: center;
  margin-bottom: 20px;
}

/* Campos de entrada */
.inputField {
  padding: 12px 15px;
  border: 2px solid #0072ff;
  border-radius: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
}

.inputField:focus {
  border-color: #00c6ff;
  box-shadow: 0 0 10px rgba(0, 198, 255, 0.5);
  outline: none;
}

.inputField::placeholder {
  color: #6c757d;
  font-style: italic;
}

/* Botón del formulario */
.form-btn {
  background: linear-gradient(to right, #0072ff, #00c6ff);
  color: #fff;
  font-size: 1.2rem;
  padding: 12px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.form-btn:hover {
  background: linear-gradient(to right, #00c6ff, #0072ff);
  box-shadow: 0 0 15px rgba(0, 198, 255, 0.5);
  transform: scale(1.05);
}

/* Mensajes de feedback */
.feedback-container {
  margin-top: 10px;
  text-align: center;
}

.feedback-message {
  font-size: 14px;
  color: #0072ff;
}
</style>

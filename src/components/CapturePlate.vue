<template>
    <div class="container">
      <h1 class="title">Capturar Placa</h1>
      <div class="content">
        <!-- Botón para activar el servicio -->
        <button class="btn-capture" @click="capturarPlaca" :disabled="cargando">
          {{ cargando ? "Procesando..." : "Capturar Placa" }}
        </button>
  
        <!-- Mensaje de procesamiento -->
        <p v-if="cargando" class="mensaje">Procesando...</p>
  
        <!-- Mostrar la placa capturada o el mensaje de error -->
        <p v-else class="placa" :class="{ error: error }">{{ textoPlaca }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    name: "CapturarPlaca",
    setup() {
      const textoPlaca = ref("Esperando captura...");
      const cargando = ref(false);
      const error = ref(false);
  
      const capturarPlaca = async () => {
        cargando.value = true;
        textoPlaca.value = "Procesando...";
        error.value = false;
  
        try {
          const response = await fetch("http://localhost:5000/capturar_placa");
  
          if (!response.ok) throw new Error("Error al capturar la placa");
  
          const data = await response.json();
  
          if (data.placa) {
            textoPlaca.value = data.placa.toUpperCase();
          } else {
            textoPlaca.value = "No se detectó la placa";
            error.value = true;
          }
        } catch (err) {
          console.error("Error:", err);
          textoPlaca.value = "Error al capturar la placa";
          error.value = true;
        } finally {
          cargando.value = false;
        }
      };
  
      return { textoPlaca, cargando, error, capturarPlaca };
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
  }
  
  .title {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .btn-capture {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-bottom: 20px;
    transition: background-color 0.3s;
  }
  
  .btn-capture:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .btn-capture:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  .mensaje {
    font-size: 4rem;
    color: #39348f;
  }
  
  .placa {
    font-size: 2rem;
  font-weight: bold;
  letter-spacing: 3px;
  color: #333;
  background: linear-gradient(90deg, #ffdd00, #ffa600);
  padding: 10px 20px;
  border: 2px solid #000;
  border-radius: 5px;
  text-transform: uppercase;
    
  }
  
  .placa.error {
    color: #dc3545;
  }
  </style>
  
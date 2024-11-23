<template>
<!-- Estructura nueva ultimo commit front  -->
 <div class="home">
  <div class="container-form">
      <form class="form" @submit.prevent="exitVehicle">
        <h1 class="form-title">Registrar Salida de Vehículo</h1>
            
            <label for="placa" class="info-inputField">Placa</label>
              <input
                v-model="placa"
                type="text"
                id="placa"
                class="inputField"
                placeholder="Ej: ABC123"
                required
              />
          
              <div class="form-check">
              <input
                type="checkbox"
                v-model="cobrarPorMinuto"
                class="form-check-input"
                id="cobrarPorMinuto"
              />
              <label class="info-inputField" for="cobrarPorMinuto">
                Cobrar por minuto
              </label>
            </div>
          <button type="submit" class="form-btn">Registrar Salida</button>

          <!-- Mostrar respuesta después de la salida -->
        <div v-if="responseData" class="mt-4">
            <p><strong>Placa:</strong> {{ responseData.placa }}</p>
            <p><strong>Costo Total:</strong> {{ responseData.costoTotal }}</p>
            <p><strong>Mensaje:</strong> {{ responseData.mensaje }}</p>
          </div>

          <!-- Mensaje de error -->
          <p v-if="message" class="mt-3 text-center text-danger">{{ message }}</p>
        </form>
    </div>
</div>

  <!-- Anteriores estilos -->

<!--  <div class="container">
    <div class="card mx-auto" style="max-width: 500px;">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Registrar Salida de Vehículo</h2>
        <form @submit.prevent="exitVehicle">
          <div class="mb-3">
            <label for="placa" class="form-label">Placa</label>
            <input
              v-model="placa"
              type="text"
              id="placa"
              class="form-control"
              placeholder="Ej: ABC123"
              required
            />
          </div>
          <div class="form-check mb-3">
            <input
              type="checkbox"
              v-model="cobrarPorMinuto"
              class="form-check-input"
              id="cobrarPorMinuto"
            />
            <label class="form-check-label" for="cobrarPorMinuto">
              Cobrar por minuto
            </label>
          </div>
          <button type="submit" class="btn btn-primary w-100">Registrar Salida</button>
        </form>

        <div v-if="responseData" class="mt-4">
          <p><strong>Placa:</strong> {{ responseData.placa }}</p>
          <p><strong>Costo Total:</strong> {{ responseData.costoTotal }}</p>
          <p><strong>Mensaje:</strong> {{ responseData.mensaje }}</p>
        </div>

        <p v-if="message" class="mt-3 text-center text-danger">{{ message }}</p>
      </div>
    </div>
  </div> -->
</template>

<script>
import { ref } from 'vue';
import { mostrarSpinner } from '@/store/spinner';

export default {
  setup() {
    const placa = ref('');
    const cobrarPorMinuto = ref(false);
    const responseData = ref(null);
    const message = ref('');

    const exitVehicle = async () => {
      responseData.value = ''; // Cada vez que se de click se regenera el texto
      mostrarSpinner(); // Spinner que muestra carga
      try {
        const response = await fetch(`http://localhost:8080/api/vehiculos/salida/${placa.value}?cobrarPorMinuto=${cobrarPorMinuto.value}`, {
          method: 'PUT'
        });
        
        if (!response.ok) throw new Error('Error en la solicitud');

        const data = await response.json(); 

        setTimeout(() => {
          responseData.value = data; // Deja que el spinner aparezca sin texto y espera hasta nuevo click para quitarse 
        }, 1000);
        message.value = '';

      } catch (error) {
        console.error('Error al registrar la salida:', error);
        responseData.value = null;
        message.value = 'Error al registrar la salida. Intenta de nuevo.';
      }
    };

    return { placa, cobrarPorMinuto, exitVehicle, responseData, message };
  }
};
</script>

<style scoped>
/* Nuevos estilos */

.home {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%; 
    min-height: 80vh;
    align-items: center;
    justify-content: center;
}

.container-form {
    display: flex;
    flex-direction: column;
    justify-self: center; /* Centrar en el eje X */
    align-self: center; /* Centrar en el eje Y */
    border: 2px solid #6c757d;
    width: 500px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 20px;
    margin-bottom: 10px;
    padding: 20px;
  }
  
  .form-title {
    font-size: 30px;
    font-weight: 700;
    text-align: center;
    color: #212529;
  }
  
  .info-inputField {
    color: #212529;
    font-weight: 500;
    font-size: 18px;
  }

  .inputField {
    padding: 15px 20px;
    width: 100%;
    border: 1px solid #6c757d;
    border-radius: 10px;
    font-size: 18px;
    color: #000;
    transition: all 0.3s ease; /* Animación suave */
  }

  .inputField::placeholder {
    color: #6c757d;
    font-style: oblique;
  }
  
  .form-btn {
    width: 100%;
    background-color: #332FF6;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    margin: 0 auto;
    padding: 15px;
    transition: all 0.3s ease;
  }

  .form-btn:hover {
    background-color: rgba(51, 47, 246, 0.9);
    transform: scale(1.01);
  }
</style>

<template>
<div class="home">
  <div class="container-form">
    <form class="form" @submit.prevent="registerVehicle">
      <h1 class="form-title">Registrar Entrada de Vehículo</h1>
          
          <label for="placa" class="info-inputField">Placa</label>
          <input
            v-model="placa"
            type="text"
            id="placa"
            class="inputField"
            placeholder="Ej: ABC123"
            required
            />
         
          <label for="tipoVehiculo" class="info-inputField">Tipo de Vehículo</label>

          <!-- Se agrega select para el tipo de vehiculo -->

          <select 
          v-model="tipoVehiculo"
          id="tipoVehiculo"
          class="inputField"
          name="criptomoneda"
          >
            <option value="" disabled selected required class="option-info">Seleciona el tipo de Vehiculo</option>
            <option value="automovil">Automovil</option>
            <option value="camioneta">Camioneta</option>
            <option value="moto">Moto</option>
            <option value="scooter">Scooter</option>
            <option value="camion">Camion</option>
            <option value="taxi">Taxi</option>
          </select>

            <!-- <input
              v-model="tipoVehiculo"
              type="text"
              id="tipoVehiculo"
              class="inputField"
              placeholder="Ej: Carro, SUV, Moto, Taxi, Mula"
              required
            /> -->
            
            <p v-if="message" class="mt-3 fs-6 text-center">{{ message }}</p>
        <button type="submit" class="form-btn">Registrar</button>
      </form>
  </div>
</div>

  <!-- Anterior codigo HTML -->

  <!-- <div class="container">
    <div class="card mx-auto" style="max-width: 500px;">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Registrar Entrada de Vehículo</h2>
        <form @submit.prevent="registerVehicle">
          <div class="mb-3">
            <label for="placa" class="info-inputField">Placa</label>
            <input
              v-model="placa"
              type="text"
              id="placa"
              class="inputField"
              placeholder="Ej: ABC123"
              required
            />
          </div>
          <div class="mb-3">
            <label for="tipoVehiculo" class="info-inputField">Tipo de Vehículo</label>
            <input
              v-model="tipoVehiculo"
              type="text"
              id="tipoVehiculo"
              class="inputField"
              placeholder="Ej: Carro, Moto"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Registrar</button>
        </form>
        <p v-if="message" class="mt-3 text-center">{{ message }}</p>
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
    const tipoVehiculo = ref('');
    const message = ref('');

    const registerVehicle = async () => {
      message.value = ''; // Cada vez que se de click se regenera el texto
      mostrarSpinner(); // Spinner que muestra carga
      try {
        const response = await fetch('http://localhost:8080/api/vehiculos/entrada', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ placa: placa.value, tipoVehiculo: tipoVehiculo.value }),
        });
        const data = await response.json();

        setTimeout(() => {
          message.value = data.mensaje; // Deja que el spinner aparezca sin texto y espera hasta nuevo click para quitarse 
        }, 1000);

      } catch (error) {
        console.error('Error al registrar el vehículo:', error);
        message.value = 'Error al registrar el vehículo.';
      }
    };

    return { placa, tipoVehiculo, registerVehicle, message };
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
    font-weight: 600;
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
    margin: 10px 0 0 auto;
    padding: 15px;
    transition: all 0.3s ease;
  }

  .form-btn:hover {
    background-color: rgba(51, 47, 246, 0.9);
    transform: scale(1.01);
  }

</style>

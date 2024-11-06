<template>
    <div>
      <h2>Registrar Entrada de Vehículo</h2>
      <form @submit.prevent="registerVehicle">
        <input v-model="placa" placeholder="Placa" required />
        <input v-model="tipoVehiculo" placeholder="Tipo de Vehículo" required />
        <button type="submit">Registrar</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const placa = ref('');
      const tipoVehiculo = ref('');
      const message = ref('');
  
      const registerVehicle = async () => {
        try {
          const response = await fetch('http://localhost:8080/api/vehiculos/entrada', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ placa: placa.value, tipoVehiculo: tipoVehiculo.value }),
          });
          const data = await response.json();
          message.value = data.mensaje;
        } catch (error) {
          console.error('Error al registrar el vehículo:', error);
          message.value = 'Error al registrar el vehículo.';
        }
      };
  
      return { placa, tipoVehiculo, registerVehicle, message };
    }
  };
  </script>
  
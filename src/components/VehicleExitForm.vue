<template>
  <div>
    <h2>Registrar Salida de Vehículo</h2>
    <form @submit.prevent="exitVehicle">
      <input v-model="placa" placeholder="Placa" required />
      <label>
        <input type="checkbox" v-model="cobrarPorMinuto" /> Cobrar por minuto
      </label>
      <button type="submit">Registrar Salida</button>
    </form>
    <div v-if="responseData">
      <p><strong>Placa:</strong> {{ responseData.placa }}</p>
      <p><strong>Costo Total:</strong> {{ responseData.costoTotal }}</p>
      <p><strong>Mensaje:</strong> {{ responseData.mensaje }}</p>
    </div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const placa = ref('');
    const cobrarPorMinuto = ref(false);
    const responseData = ref(null);
    const message = ref('');

    const exitVehicle = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/vehiculos/salida/${placa.value}?cobrarPorMinuto=${cobrarPorMinuto.value}`, {
          method: 'PUT'
        });
        
        if (!response.ok) throw new Error('Error en la solicitud');

        const data = await response.json();
        responseData.value = data;
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
/* Agrega estilos específicos si lo deseas */
</style>

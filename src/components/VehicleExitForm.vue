<template>
  <div class="container mt-5">
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

        <!-- Mostrar respuesta después de la salida -->
        <div v-if="responseData" class="mt-4">
          <p><strong>Placa:</strong> {{ responseData.placa }}</p>
          <p><strong>Costo Total:</strong> {{ responseData.costoTotal }}</p>
          <p><strong>Mensaje:</strong> {{ responseData.mensaje }}</p>
        </div>

        <!-- Mensaje de error -->
        <p v-if="message" class="mt-3 text-center text-danger">{{ message }}</p>
      </div>
    </div>
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
/* Estilos personalizados si son necesarios */
</style>

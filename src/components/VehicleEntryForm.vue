<template>
  <div class="container mt-5">
    <div class="card mx-auto" style="max-width: 500px;">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Registrar Entrada de Vehículo</h2>
        <form @submit.prevent="registerVehicle">
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
          <div class="mb-3">
            <label for="tipoVehiculo" class="form-label">Tipo de Vehículo</label>
            <input
              v-model="tipoVehiculo"
              type="text"
              id="tipoVehiculo"
              class="form-control"
              placeholder="Ej: Carro, Moto"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Registrar</button>
        </form>
        <p v-if="message" class="mt-3 text-center">{{ message }}</p>
      </div>
    </div>
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

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>

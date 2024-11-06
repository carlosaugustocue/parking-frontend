<template>
  <div class="container">
    <div>
      <!-- Verifica si hay algún espacio ocupado -->
      <div v-if="hasOccupiedSpaces" class="parking-lot">
        <div
          v-for="(space, index) in spaces"
          :key="index"
          class="parking-space"
          @click="handleClick(space)"
        >
          <!-- Información del vehículo si el espacio está ocupado -->
          <div v-if="space.occupied" class="vehicle-info">
            <p class="plate">{{ space.placa }}</p>
            <p class="type">{{ space.tipoVehiculo }}</p>
            <img
              :src="getVehicleImage(space.tipoVehiculo)"
              alt="Vehículo"
              class="vehicle-image"
            />
          </div>
          
          <!-- Muestra texto si el espacio está libre -->
          <div v-else class="empty-space">
            <p class="text">Espacio Libre</p>
          </div>
        </div>
      </div>
      <!-- Muestra un mensaje si no hay autos en el parqueadero -->
      <div v-else class="no-cars-message">
        <p>No hay autos en el parqueadero.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';

// Importa las imágenes de los vehículos
import CarImage from '@/assets/car_top_view.png';
import MotorcycleImage from '@/assets/motorcycle_top_view.png';
import TruckImage from '@/assets/truck_top_view.png';
import DefaultImage from '@/assets/default_vehicle_top_view.png';

export default {
  emits: ['showInvoice'],
  setup(_, { emit }) {
    const spaces = ref([]);
    const hasOccupiedSpaces = ref(false);

    const fetchParkingStatus = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/vehiculos');
        const data = await response.json();
        spaces.value = data.map((vehiculo, index) => ({
          index,
          placa: vehiculo.placa || null,
          tipoVehiculo: vehiculo.tipoVehiculo || 'Desconocido',
          horaIngreso: vehiculo.horaIngreso || null,
          occupied: !!vehiculo.placa,
        }));

        // Verifica si hay al menos un espacio ocupado
        hasOccupiedSpaces.value = spaces.value.some(space => space.occupied);
      } catch (error) {
        console.error('Error al obtener el estado del parqueadero:', error);
      }
    };

    const getVehicleImage = (tipoVehiculo) => {
      switch (tipoVehiculo.toLowerCase()) {
        case 'carro':
          return CarImage;
        case 'moto':
          return MotorcycleImage;
        case 'camion':
          return TruckImage;
        default:
          return DefaultImage;
      }
    };

    const handleClick = async (space) => {
      if (space.occupied) {
        Swal.fire({
          title: '¿Registrar salida?',
          text: `¿Deseas registrar la salida del vehículo con placa ${space.placa}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sí, registrar salida',
          cancelButtonText: 'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
              const response = await fetch(`http://localhost:8080/api/vehiculos/salida/${space.placa}?cobrarPorMinuto=false`, {
                method: 'PUT'
              });
              if (!response.ok) throw new Error('Error al procesar la salida del vehículo.');

              const data = await response.json();
              emit('showInvoice', {
                placa: space.placa,
                tipoVehiculo: space.tipoVehiculo,
                horaIngreso: space.horaIngreso,
                horaSalida: new Date().toISOString(),
                costoTotal: data.costoTotal,
              });

              fetchParkingStatus();

              Swal.fire({
                title: 'Salida registrada',
                text: 'La salida del vehículo ha sido registrada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });

            } catch (error) {
              console.error('Error al registrar la salida:', error);
              Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al procesar la salida del vehículo.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          }
        });
      } else {
        Swal.fire({
          title: 'Espacio libre',
          text: 'Este espacio está libre.',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        });
      }
    };

    onMounted(() => {
      fetchParkingStatus();
    });

    return { spaces, hasOccupiedSpaces, handleClick, getVehicleImage };
  }
};
</script>

<style scoped>
.parking-lot {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Ajusta el número de columnas según tus necesidades */
  border-radius: 5px;
  gap: 15px;
  padding: 20px;
  background-color: #2c2c2c; /* Fondo oscuro para simular asfalto */
}

.parking-space {
  width: 100%;
  aspect-ratio: 1 / 1; /* Mantiene el espacio cuadrado */
  background-color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #fff;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  position: relative; /* Necesario para posicionar la placa sobre la imagen */
}

.vehicle-info {
  text-align: center;
  position: relative;
}

.plate, .type {
  position: absolute;
  top: 5px; /* Ajusta para posicionar sobre la imagen */
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 0.8rem;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2px 5px;
  border-radius: 3px;
}

.type {
  top: 25px;
}

.vehicle-image {
  width: 50%; /* Ajusta el tamaño de la imagen dentro del contenedor */
  height: auto;
  object-fit: contain;
}

.empty-space {
  color: #28a745;
  font-size: 1.2rem;
  font-style: italic;
  text-align: center;
}

.no-cars-message {
  text-align: center;
  color: #6c757d;
  font-size: 1.5rem;
  margin-top: 20px;
}
</style>

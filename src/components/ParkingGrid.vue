<template>
  <div class="container">
    <p>
      Ocupados: <span class="bg-warning p-1 rounded">{{ occupiedSpacesCount }}</span>, 
      Restantes: <span class="bg-warning p-1 rounded">{{ 10 - occupiedSpacesCount }}</span>
    </p>
    <div>
      <div v-if="hasOccupiedSpaces" class="parking-lot">
        <div
          v-for="(space, index) in spaces"
          :key="index"
          class="parking-space"
          @click="handleClick(space)"
        >
          <div v-if="space.occupied" class="vehicle-info">
            <p class="plate">{{ space.placa }}</p>
            <p class="type">{{ space.tipoVehiculo }}</p>
            <img
              :src="getVehicleImage(space.tipoVehiculo)"
              alt="Vehículo"
              class="vehicle-image"
            />
          </div>
          <div v-else class="empty-space">
            <p class="text">Espacio Libre</p>
          </div>
        </div>
      </div>
      <div v-else class="no-cars-message">
        <p>No hay autos en el parqueadero.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import Swal from 'sweetalert2';
import CarImage from '@/assets/car_top_view.png';
import MotorcycleImage from '@/assets/motorcycle_top_view.png';
import TruckImage from '@/assets/truck_top_view.png';
import DefaultImage from '@/assets/default_vehicle_top_view.png';

export default {
  setup() {
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
          html: `
    <p>¿Deseas registrar la salida del vehículo con placa <span class="placa-salida">${space.placa}</span>?</p>
  `,
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
              const currentDateTime = new Date();
              const formattedDate = currentDateTime.toLocaleDateString('es-ES') + ' ' + currentDateTime.toLocaleTimeString();

              // Mostrar la factura en el SweetAlert
              Swal.fire({
                title: 'Salida registrada',
                html: `
                  <div class="invoice">
                    <h3 class="invoice-title">Factura Venta</h3>
                    <p class="invoice-number">ID: ${data.facturaId || 'kk720'}</p>
                    <p class="invoice-date">Fecha: ${formattedDate}</p>

                    <p><strong>Placa:</strong> <span class="placa-salida">${data.placa}</span></p>
                    <p><strong>Tipo de Vehículo:</strong> ${space.tipoVehiculo}</p>
                    <p><strong>Hora de Ingreso:</strong> ${space.horaIngreso}</p>
                    <p><strong>Hora de Salida:</strong> ${currentDateTime.toLocaleTimeString()}</p>
                    <p><strong>Costo Total:</strong> ${data.costoTotal}</p>
                  </div>
                `,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });

              fetchParkingStatus();
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

    const occupiedSpacesCount = computed(() => {
      return spaces.value.filter(space => space.occupied).length;
    });

    return { spaces, hasOccupiedSpaces, handleClick, getVehicleImage, occupiedSpacesCount };
  }
};
</script>

<style scoped>
.parking-lot {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-radius: 5px;
  gap: 15px;
  padding: 20px;
  background-color: #2c2c2c;
}

.parking-space {
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #fff;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.plate, .type {
  position: absolute;
  top: 5px;
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
  width: 50%;
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

.invoice {
  font-family: Arial, sans-serif;
  font-size: 14px;
  width: 250px;
  margin: 0 auto;
  padding: 15px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  line-height: 1.5;
  text-align: center;
}

</style>

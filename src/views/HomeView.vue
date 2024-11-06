<template>
  <div class="home-view">
    <h1>Estado del Parqueadero</h1>
    <ParkingGrid @showInvoice="displayInvoice" />
    <Invoice v-if="invoiceData" :invoiceData="invoiceData" />
  </div>
</template>

<script>
import { ref } from 'vue';
import ParkingGrid from '../components/ParkingGrid.vue';
import Invoice from '../components/VehicleInvoice.vue';

export default {
  components: {
    ParkingGrid,
    Invoice
  },
  setup() {
    const invoiceData = ref(null);

    const displayInvoice = (data) => {
      invoiceData.value = data;
    };

    return { invoiceData, displayInvoice };
  }
};
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

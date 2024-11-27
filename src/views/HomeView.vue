<template>
  <div class="home-view">
    <h1 class="title-home">Estado del Parqueadero</h1>
    <ParkingGrid @showInvoice="displayInvoice" />
    <Invoice v-if="invoiceData" :invoiceData="invoiceData" />
  </div>

  <AdAside/>
</template>

<script>
import { ref } from 'vue';
import ParkingGrid from '../components/ParkingGrid.vue';
import Invoice from '../components/VehicleInvoice.vue';
import AdAside from '@/components/AdAside.vue';

export default {
  components: {
    ParkingGrid,
    Invoice,
    AdAside
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

.title-home{
  font-weight: 700;
  font-size: 35px;
  text-align: center;
  color: #212529;
}
</style>

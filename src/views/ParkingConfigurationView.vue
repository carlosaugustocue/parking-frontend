<template>
  <div>
    <ParkingConfiguration />
    <AdAside></AdAside>
  </div>
</template>

<script>
import ParkingConfiguration from '../components/ParkingConfiguration.vue';
import AdAside from '../components/AdAside.vue';

export default {
  components: {
    ParkingConfiguration,
    AdAside
  }
};
</script>

<style scoped>
/* Agrega estilos específicos de la vista aquí */
</style>

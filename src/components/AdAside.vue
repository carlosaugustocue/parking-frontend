<template>
  <aside class="asideAd bg-light border-end d-none d-lg-block">
    <div class="ad p-3 text-center" @click="abrirAnuncio">
      <header class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <span class="title-header-aside fw-bold text-primary">Anuncios</span>
        <button class="btn btn-sm btn-outline-danger close-aside" aria-label="Cerrar">X</button>
      </header>

      <h2 class="brand-ad h6 text-dark fw-bold">Inmobiliaria S.A.S</h2>
      <div class="container-img-ad mb-3">
        <img src="../assets/inmobiliaria.png" alt="Anuncio" class="img-ad img-fluid rounded" />
      </div>

      <div class="info-ad text-start">
        <p class="price-product-ad fw-bold text-success">Precios desde <br /> $100.000 - $1'000.000</p>
        <p class="descripcion-ad text-secondary">
          ¡Encuentra Tu Hogar Ideal! <br />
          🏡 Ubicación: Casas y apartamentos en las mejores zonas. <br />
          🏙️ Propiedades destacadas esta semana <br />
          📞 Contáctanos hoy: <br />
          Teléfono: +1 123 456 789 <br />
          Correo: info@tuinmobiliaria.com <br />
          ¡Agenda tu cita aquí!
        </p>
        <p class="important-info-ad text-dark fw-bold">
          ¡Propiedades en venta adaptadas a tus necesidades!
        </p>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  methods: {
    abrirAnuncio() {
      window.open("https://momentozero.com.co/", "_blank");
    },
  },
};
</script>

<style scoped>
.asideAd {
  width: 20%;
  min-height: 100vh;
  position: fixed;
  top: 85px;
  left: 0;
}

.ad {
  cursor: pointer;
}

/* Ocultar aside en pantallas pequeñas */
@media (max-width: 992px) {
  .asideAd {
    display: none;
  }
}
</style>

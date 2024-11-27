<template>
    <!-- Seccion del aside, se espera convertir en componente -->

    <section class="asideAd">
    <div class="ad" onclick="window.open('https://momentozero.com.co/', '_blank');" >
      <header class="header-aside">
        <span class="title-header-aside">Anuncios</span> 
        <span class="close-aside">X</span>
      </header>

      
      <h1 class="brand-ad">Inmobiliaria S.A.S</h1>

      <div class="container-img-ad">
        <img src="../assets/inmobiliaria.png" alt="Imagen del anuncio publicitario" class="img-ad">
      </div>

      <div class="info-ad">
        <span class="price-product-ad">Precios desde <br> $100.000 - $1'000.000</span>
        <span class="descripcion-ad">¡Encuentra Tu Hogar Ideal! <br> 🏡  Ubicación: Casas y apartamentos en las mejores zonas. <br>
          🏙️ Propiedades destacadas esta semana
          Apartamento en el centro <br>
          📞 Contáctanos hoy
          Teléfono: +1 123 456 789
          Correo: info@tuinmobiliaria.com
          ¡Agenda tu cita aquí! <br>
          ✨ Oferta Especial de Noviembre
          ¡Comisión reducida al 0% para compradores hasta el 30 de noviembre!</span>
        <p class="important-info-ad">¡Propiedades en venta adaptadas a tus necesidades!</p>
      </div>
    </div>
      
  </section>
</template>

<style>
/* Estilos de la seccion del aside publicitario */

.asideAd {
  width: 12%;
  position: absolute;
  left: 0;
  top: 85px;
  min-height: 100vh;
  border-right: 1px solid #8d99ae;
  border-top: none;
  padding: 0;
}

.ad {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  padding: 2px;
  cursor: pointer;
}

.header-aside {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
}

.title-header-aside {
  width: 85%;
  font-size: 12px;
  text-align: left;
  padding: 1px 0;
}

.close-aside {
  width: 15%;
  right: 0;
  font-size: 14px;
  text-align: center;
  font-weight: 700;
  padding: 1px 0;
  color: #ef233c;
  font-weight: 700;
  text-align: center;
  justify-self: center;
  align-self: center;
  border-radius: 5px;
  transition: .3s all ease;
}

.close-aside:hover {
  color: rgba(239, 35, 60, 0.5);
}

.brand-ad {
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  width: 100%;
}

.container-img-ad {
  margin: 0 auto;
  padding: 2px;
}

.img-ad {
  width: 100%;
  border-radius: 5px;
}

.price-product-ad {
  font-weight: 700;
  text-align: left;
}

.info-ad {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  line-height: 20px;
  font-size: 12px;
}

.descripcion-ad {
  text-align: left;
}

.important-info-ad {
  font-weight: 600;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 1000px) {
    .asideAd {
        display: none;
    }
}

/* ============= */
</style>
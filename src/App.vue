<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container-fluid">
        <!-- Título dinámico del parqueadero -->
        <router-link to="/" class="navbar-brand">
          <h1 id="principal-title">{{ nombreParqueadero }}</h1>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link to="/entry" class="nav-link">Registrar Entrada</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/exit" class="nav-link">Registrar Salida</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link">Estado del Parqueadero</router-link>
            </li>
            <li class="nav-item">
              <router-link to="configuration" class="nav-link">
                <div class="container-settings-img">
                  <img src="./assets/user.png" alt="User Img" class="user-img">
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <section class="asideAd">
      <div class="ad" onclick="window.open('https://momentozero.com.co/', '_blank');" >
        <header class="header-aside">
          <span class="title-header-aside">Anunciado Por</span> 
          <span class="close-aside">X</span>
        </header>

        
        <h1 class="brand-ad">Inmobiliaria S.A.S</h1>

        <div class="container-img-ad">
          <img src="./assets/inmobiliaria.png" alt="Imagen del anuncio publicitario" class="img-ad">
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
          <p class="important-info-ad">¡Propiedades en venta o arriendo adaptadas a tus necesidades!</p>
        </div>
      </div>
        
    </section>

    <!-- Spinner -->
    <loading v-model:active="loading" :is-full-page="true" />

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

.container-settings-img {
  background-color: #fff;
  border-radius: 5px;
  padding: 5px 10px;
  transition: all .3s ease;
}

.container-settings-img:hover {
  background-color: #8d99ae;
}

.user-img {
  width: 30px;
  height: 30px;
  background-color: transparent;
  border-radius: 50%;
  font-weight: 700;
}

.navbar-nav {
  align-items: center;
}

/* Estilos Aside */
.asideAd {
  width: 12%;
  position: absolute;
  left: 0;
  top: 85px;
  height: 100vh;
  border: 1px solid #8d99ae;
  border-top: none;
  padding: 25px 0;
  background-color: #8d99ae;
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
  font-size: 16px;
  text-align: left;
}

.close-aside {
  width: 15%;
  right: 0;
  font-size: 15px;
  text-align: right;
  font-weight: 700;
  padding: 1px 0;
  border: 3px solid #d00000;
  color: #d00000;
  font-weight: 700;
  text-align: center;
  border-radius: 5px;

}

.brand-ad {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  width: 100%;
}

.container-img-ad {
  margin: 20px 0;
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
  gap: 25px;
  padding: 10px;
  line-height: 25px;
}

.descripcion-ad {
  text-align: left;
}

.important-info-ad {
  font-weight: 600;
  text-align: center;
  font-size: 20px;
}

@media (max-width: 1000px) {
    .asideAd {
        display: none;
    }
}

/* ============= */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  text-decoration: none;
  list-style: none;
  font-family: "Poppins", serif;
  -webkit-font-smoothing: antialiased; /* Para navegadores basados en WebKit */
  -moz-osx-font-smoothing: grayscale; /* Para Firefox en macOS */
}

.navbar {
  background-color: #181818;
  margin-bottom: 10px;
  padding: 10px;
  justify-content: center;
  align-items: center;
}

.nav-link {
  color: #fff;
}

/* Estilo para el enlace activo en la navegación */
.nav-link.router-link-exact-active {
  color: #332FF6 !important;
  font-weight: 700;
}

#principal-title {
  color: #fff;
  font-weight: 700;
  /* mover hacia la derecha proporcional al contenedor */
  margin-left: 30%;
}

#navbarNav {
  margin-right: 5%;
}

/* Se borraron todos los estilos con nombre Fira-sans */

.placa-salida {
  display: inline-block;
  padding: 6px 10px;
  font-weight: bold;
  font-size: 1.4rem;
  background-color: #ffdd00; /* Color amarillo como una placa */
  color: #161a1d; /* Color de texto oscuro */
  border: 1px solid #161a1d; /* Borde oscuro */
  border-radius: 5%;
  letter-spacing: 1px;
  text-align: center;
}

.placa-salida::before,
.placa-salida::after {
  content: "•";
  margin: 0 2px;
  color: #161a1d; /* Color de los puntos al lado de la placa */
}

</style>

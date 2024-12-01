<template>
  <div>
    <aside class="asideAd bg-light border-end" v-if="mostrarAside">
      <header class="d-flex justify-content-between align-items-center border-bottom p-2 mb-3">
        <span class="title-header-aside fw-bold text-primary">Anuncios</span>
        <button class="btn btn-sm btn-outline-danger" @click="cerrarAside">X</button>
      </header>

      <div class="ad p-3 text-center" @click="irAEnlace" :data-url="anuncioActual.link">
        <div v-if="anuncios.length === 0">
          <p>No hay publicidad disponible en este momento.</p>
        </div>
        <div v-else>
          <h2 class="brand-ad h6 text-dark fw-bold">
            🚘 {{ anuncioActual.marca }} {{ anuncioActual.modelo }} - {{ anuncioActual.año }}
          </h2>
          <div class="container-img-ad mb-3">
            <img :src="anuncioActual.thumbnail" alt="Anuncio" class="img-ad img-fluid rounded"/>
          </div>
          <div class="info-ad text-start">
            <p class="price-product-ad fw-bold text-success text-center">
              {{ anuncioActual.precio || "No disponible" }} COP
            </p>
            <p class="descripcion-ad text-secondary">
              <strong>📏 Kilometraje:</strong> {{ anuncioActual.kilometraje }} <br>
              <strong>📍 Ubicación:</strong> {{ anuncioActual.ubicacion }} <br>
              <strong>🔍 Estado:</strong> {{ anuncioActual.estado }} <br>
              <strong>🤝 Vendedor:</strong> {{ anuncioActual.vendedor }}
            </p>
            <p class="important-info-ad text-center">
              🔥 ¡Compra ya en Mercado Libre Colombia!
            </p>
          </div>
        </div>
      </div>
    </aside>

    <button 
      v-if="!mostrarAside" 
      class="btn open-aside btn-outline-primary" 
      @click="abrirAside">
      Anuncios
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      anuncios: [],
      indiceActual: 0,
      mostrarAside: true,
    };
  },
  computed: {
    anuncioActual() {
    if (this.anuncios.length === 0) return {};
    const anuncio = this.anuncios[this.indiceActual];
    const atributos = anuncio.attributes.reduce((acc, attr) => {
      acc[attr.id] = attr.value_name;
      return acc;
    }, {});

    return {
      marca: atributos.BRAND || "No disponible",
      modelo: atributos.MODEL || "No disponible",
      año: atributos.VEHICLE_YEAR || "No disponible",
      kilometraje: atributos.KILOMETERS || "No disponible",
      estado: atributos.ITEM_CONDITION || "No disponible",
      precio: anuncio.price
        ? new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
          }).format(anuncio.price)
        : "No disponible",
      thumbnail: anuncio.thumbnail,
      ubicacion: anuncio.address?.city_name || "No disponible",
      vendedor: anuncio.seller?.nickname || "Anónimo",
      link: anuncio.permalink || "#", // Link al anuncio
    };
  },
},
  mounted() {
    this.obtenerPublicidad();
    setInterval(this.actualizarAnuncio, 6000);
  },
  methods: {
    async obtenerPublicidad() {
      const url = "https://api.mercadolibre.com/sites/MCO/search?q=autos";
      try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        this.anuncios = data.results;
      } catch (error) {
        console.error("Error al obtener la publicidad:", error);
      }
    },
    actualizarAnuncio() {
      if (this.anuncios.length > 0) {
        this.indiceActual = (this.indiceActual + 1) % this.anuncios.length;
      }
    },
    irAEnlace() {
      const adElement = this.$el.querySelector(".ad");
      const url = adElement.dataset.url;  // Obtiene la URL desde el atributo data-url
      if (url) {
      window.open(url, "_blank");  // Abre la URL en una nueva pestaña
      }
    },
    cerrarAside() {
      this.mostrarAside = false;
    },
    abrirAside() {
      this.mostrarAside = true;
    },
  },
};
</script>

<style>
/* General */

.asideAd {
    width: 20%;
    min-height: 100vh;
    position: fixed;
    top: 60px;
    left: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    transition: all 0.4s ease-in-out;
    background: linear-gradient(145deg, #ffffff, #e4e7ec);
    z-index: 1000;
  }

  /* Ocultar el aside desplazándolo hacia la izquierda */
.asideAd.hidden {
  transform: translateX(-100%); /* Mueve el aside fuera de la vista */
  opacity: 0; /* Hace que desaparezca */
}
  
.ad {
    cursor: pointer;
    transition: opacity 1s ease-in-out;
    position: relative;
  }

.container-img-ad {
    margin: 20px 0;
}

.ad img {
    width: 85%;
    border-radius: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;
    object-fit: cover; /* Para evitar deformaciones */
}

.ad img:hover {
    transform: scale(1.01);
}

.ad .brand-ad {
    font-size: 1.1rem;
    margin: 0;
    color: #2c3e50;
}

.ad .info-ad {
    padding: 10px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    text-align: left;
}

.ad .important-info-ad {
    font-size: 0.9rem;
    font-weight: 900;
    margin-top: 1rem;
}

.open-aside {
    position: fixed;
    top: 80px;
    left: 0;
    transform: translateY(-50%);
    background-color: #f8f9fa;
    color: #332ff6;
    font-size: 24px;
    font-weight: 700;
    border: 1px solid #ced4da;
    border-radius: 0 5px 5px 0;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 0.9rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 0; /* Asegura que esté sobre el aside */
    transition:  all .3s ease;
}

/* Mostrar el botón cuando el aside está oculto */
.asideAd.hidden ~ .open-aside {
    display: block;
    opacity: 0.8; /* Ligera transparencia */
}

.close-ad {
  align-self: center;
  justify-self: center;
}

/* Transición al cambiar anuncios */
.ad-fade {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
}

.ad-visible {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
}

/* Ocultar aside en pantallas pequeñas */
@media (max-width: 992px) {
    .asideAd {
        display: none;
    }
} 

</style>

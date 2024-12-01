<template>
  <div class="statistics-container">
    <loading v-model:active="cargando" :is-full-page="true" color="#0072ff" />

    <h1 class="title">Estadísticas del Parqueadero</h1>

    <!-- Contenedor para gráficos -->
    <div id="charts">
      <!-- Gráfico de ingresos y salidas por hora -->
      <div class="chart">
        <h2 class="chart-title">Ingresos y Salidas por Hora</h2>
        <div id="hourly-stats"></div>
      </div>

      <!-- Gráfico de tipos de vehículos -->
      <div class="chart">
        <h2 class="chart-title">Tipos de Vehículos</h2>
        <div id="vehicle-types"></div>
      </div>

      <!-- Gráfico de días más concurridos -->
      <div class="chart">
        <h2 class="chart-title">Días Más Concurridos</h2>
        <div id="day-stats"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import * as d3 from "d3";

export default {
  components: {
    Loading,
  },
  setup() {
    const cargando = ref(false);

    const fetchStats = async () => {
      cargando.value = true;

      try {
        const response = await fetch("http://localhost:8080/api/estadisticas");
        const data = await response.json();

        // Transformar los datos para que sean compatibles con D3.js
        const hourlyStats = {
          hours: Object.keys(data.hourlyStats),
          counts: Object.values(data.hourlyStats),
        };

        const vehicleTypes = Object.entries(data.vehicleTypes).map(
          ([type, count]) => ({
            type,
            count,
          })
        );

        const daysData = Object.entries(data.daysData).map(
          ([dia, ingresos]) => ({
            dia,
            ingresos,
          })
        );

        // Renderizar los gráficos
        renderHourlyStats(hourlyStats);
        renderVehicleTypes(vehicleTypes);
        renderDayStats(daysData);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        cargando.value = false;
      }
    };

    const renderHourlyStats = (hourlyStats) => {
      const svg = d3
        .select("#hourly-stats")
        .append("svg")
        .attr("width", 600)
        .attr("height", 350);

      const x = d3
        .scaleBand()
        .domain(hourlyStats.hours)
        .range([0, 500])
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(hourlyStats.counts)])
        .range([300, 0]);

      const g = svg.append("g").attr("transform", "translate(50, 20)");

      g.selectAll(".bar")
        .data(hourlyStats.counts)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d, i) => x(hourlyStats.hours[i]))
        .attr("y", (d) => y(d))
        .attr("width", x.bandwidth())
        .attr("height", (d) => 300 - y(d))
        .attr("fill", "#0072ff");

      g.append("g")
        .attr("transform", "translate(0, 300)")
        .call(d3.axisBottom(x));

      g.append("g").call(d3.axisLeft(y));
    };

    const renderVehicleTypes = (vehicleTypes) => {
      const svg = d3
        .select("#vehicle-types")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400);

      const radius = Math.min(400, 400) / 2;

      const g = svg
        .append("g")
        .attr("transform", `translate(${radius}, ${radius})`);

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie().value((d) => d.count);

      const arc = d3
        .arc()
        .outerRadius(radius - 10)
        .innerRadius(50);

      const arcs = g
        .selectAll(".arc")
        .data(pie(vehicleTypes))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.type));

      arcs
        .append("text")
        .attr("transform", (d) => `translate(${arc.centroid(d)})`)
        .attr("dy", "0.35em")
        .text((d) => d.data.type)
        .style("fill", "#fff");
    };

    const renderDayStats = (daysData) => {
      const svg = d3
        .select("#day-stats")
        .append("svg")
        .attr("width", 600)
        .attr("height", 350);

      const x = d3
        .scaleBand()
        .domain(daysData.map((d) => d.dia))
        .range([0, 500])
        .padding(0.2);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(daysData, (d) => d.ingresos)])
        .range([300, 0]);

      const g = svg.append("g").attr("transform", "translate(50, 20)");

      g.selectAll(".bar")
        .data(daysData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.dia))
        .attr("y", (d) => y(d.ingresos))
        .attr("width", x.bandwidth())
        .attr("height", (d) => 300 - y(d.ingresos))
        .attr("fill", "#0072ff");

      g.append("g")
        .attr("transform", "translate(0, 300)")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      g.append("g").call(d3.axisLeft(y));
    };

    onMounted(fetchStats);

    return {
      cargando,
    };
  },
};
</script>

<style scoped>
.statistics-container {
  padding: 20px;
  background: #f8f9fa;
  min-height: 100vh;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #0072ff;
  font-size: 2rem;
}

.chart {
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.chart-title {
  text-align: center;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
}
</style>

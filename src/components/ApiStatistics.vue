<template>
    <div class="statistics-container">
      <loading v-model:active="cargando" :is-full-page="true" color="#0072ff" />
  
      <h1 class="title">Estadísticas del Parqueadero</h1>
  
      <!-- Contenedor para gráficos -->
      <div id="charts">
        <!-- Gráfico de ingresos y salidas por hora -->
        <div id="hourly-stats" class="chart"></div>
  
        <!-- Gráfico de tipos de vehículos -->
        <div id="vehicle-types" class="chart"></div>
  
        <!-- Gráfico de días más concurridos -->
        <div id="day-stats" class="chart"></div>
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
  
          renderHourlyStats(data.hourlyStats);
          renderVehicleTypes(data.vehicleTypes);
          renderDayStats(data.daysData);
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
          .attr("width", 500)
          .attr("height", 300);
  
        const x = d3
          .scaleBand()
          .domain(hourlyStats.hours)
          .range([0, 400])
          .padding(0.2);
  
        const y = d3
          .scaleLinear()
          .domain([0, d3.max([...hourlyStats.ingresos, ...hourlyStats.salidas])])
          .range([250, 0]);
  
        const g = svg.append("g").attr("transform", "translate(50, 20)");
  
        g.selectAll(".bar-ingresos")
          .data(hourlyStats.ingresos)
          .enter()
          .append("rect")
          .attr("class", "bar-ingresos")
          .attr("x", (d, i) => x(hourlyStats.hours[i]))
          .attr("y", (d) => y(d))
          .attr("width", x.bandwidth() / 2)
          .attr("height", (d) => 250 - y(d))
          .attr("fill", "#0072ff");
  
        g.selectAll(".bar-salidas")
          .data(hourlyStats.salidas)
          .enter()
          .append("rect")
          .attr("class", "bar-salidas")
          .attr("x", (d, i) => x(hourlyStats.hours[i]) + x.bandwidth() / 2)
          .attr("y", (d) => y(d))
          .attr("width", x.bandwidth() / 2)
          .attr("height", (d) => 250 - y(d))
          .attr("fill", "#ff4d4d");
  
        g.append("g")
          .attr("transform", "translate(0, 250)")
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
          .attr("width", 500)
          .attr("height", 300);
  
        const x = d3
          .scaleBand()
          .domain(daysData.map((d) => d.dia))
          .range([0, 400])
          .padding(0.2);
  
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(daysData, (d) => d.ingresos)])
          .range([250, 0]);
  
        const g = svg.append("g").attr("transform", "translate(50, 20)");
  
        g.selectAll(".bar-days")
          .data(daysData)
          .enter()
          .append("rect")
          .attr("class", "bar-days")
          .attr("x", (d) => x(d.dia))
          .attr("y", (d) => y(d.ingresos))
          .attr("width", x.bandwidth())
          .attr("height", (d) => 250 - y(d.ingresos))
          .attr("fill", "#0072ff");
  
        g.append("g")
          .attr("transform", "translate(0, 250)")
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
  }
  
  .chart {
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }
  </style>
  
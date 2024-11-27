<template>
    <div class="config-container">
        <h1 class="config-title">Configuración del Parqueadero</h1>

        <!-- Configuración del nombre del parqueadero -->
        <div class="form-group">
            <label for="parking-name">Nombre del Parqueadero:</label>
            <input id="parking-name" v-model="parkingName" type="text" placeholder="Nombre del parqueadero"
                class="inputField" />
            <button @click="updateParkingName" class="btn btn-save">Guardar</button>
        </div>

        <!-- Gestión de tipos y tarifas -->
        <h2 class="config-subtitle">Tipos y Tarifas de Vehículos</h2>
        <table class="tarifas-table">
            <thead>
                <tr>
                    <th>Tipo de Vehículo</th>
                    <th>Tarifa por Hora</th>
                    <th>Tarifa por Minuto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(tipo, index) in vehicleTypes" :key="index">
                    <td>
                        <input v-model="tipo.tipoVehiculo" type="text" class="inputField"
                            placeholder="Tipo de Vehículo" />
                    </td>
                    <td>
                        <input v-model.number="tipo.tarifaHora" type="number" class="inputField"
                            placeholder="Tarifa por Hora" />
                    </td>
                    <td>
                        <input v-model.number="tipo.tarifaMinuto" type="number" class="inputField"
                            placeholder="Tarifa por Minuto" />
                    </td>
                    <td class="guardar-eliminar">
                        <button @click="deleteVehicleType(index)" class="btn btn-delete">
                            X
                        </button>
                        <button @click="saveVehicleType(index)" class="btn btn-save">
                            ✔
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Agregar nuevo tipo de vehículo -->
        <div class="form-group">
            <button @click="addVehicleType" class="btn btn-add">Agregar Nuevo Tipo</button>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const parkingName = ref(""); // Nombre del parqueadero
        const vehicleTypes = ref([]); // Lista de tipos y tarifas de vehículos

        // Cargar configuración inicial del backend
        const loadConfig = async () => {
            try {
                // Cargar el nombre del parqueadero
                const parkingResponse = await fetch(
                    "http://localhost:8080/api/configuracion/nombre-parqueadero"
                );
                const parkingData = await parkingResponse.json();
                parkingName.value = parkingData.nombreParqueadero;

                // Cargar los tipos y tarifas de vehículos
                const vehicleResponse = await fetch(
                    "http://localhost:8080/api/configuracion/tarifas"
                );
                const vehicleData = await vehicleResponse.json();
                vehicleTypes.value = vehicleData;
            } catch (error) {
                console.error("Error al cargar la configuración:", error);
            }
        };

        // Actualizar el nombre del parqueadero
        const updateParkingName = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/configuracion/nombre-parqueadero",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nombreParqueadero: parkingName.value }),
                    }
                );
                if (response.ok) {
                    alert("Nombre del parqueadero actualizado exitosamente.");
                } else {
                    throw new Error("Error al actualizar el nombre del parqueadero.");
                }
            } catch (error) {
                console.error(error);
                alert("Ocurrió un error al guardar el nombre del parqueadero.");
            }
        };


        // Guardar un tipo y tarifa de vehículo
        const saveVehicleType = async (index) => {
    try {
        const tipo = vehicleTypes.value[index];
        const body = {
            id: tipo.id,
            tipoVehiculo: tipo.tipoVehiculo,
            precioPorHora: tipo.tarifaHora, // Ajusta el nombre aquí
            precioPorMinuto: tipo.tarifaMinuto, // Ajusta el nombre aquí
        };
        const response = await fetch("http://localhost:8080/api/configuracion/tarifas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            vehicleTypes.value = await response.json(); // Actualiza la lista desde el backend
            alert("Tipo de vehículo actualizado exitosamente.");
        } else {
            throw new Error("Error al guardar el tipo de vehículo.");
        }
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al guardar el tipo de vehículo.");
    }
};




        // Eliminar un tipo y tarifa de vehículo
        const deleteVehicleType = async (index) => {
            try {
                const tipo = vehicleTypes.value[index];
                const response = await fetch(
                    `http://localhost:8080/api/configuracion/tarifas/${tipo.id}`,
                    { method: "DELETE" }
                );

                if (response.ok) {
                    vehicleTypes.value = await response.json(); // Actualiza la lista desde el backend
                    alert("Tipo de vehículo eliminado exitosamente.");
                } else {
                    throw new Error("Error al eliminar el tipo de vehículo.");
                }
            } catch (error) {
                console.error(error);
                alert("Ocurrió un error al eliminar el tipo de vehículo.");
            }
        };



        // Agregar un nuevo tipo de vehículo
        const addVehicleType = () => {
            vehicleTypes.value.push({
                tipoVehiculo: "",
                tarifaHora: 0,
                tarifaMinuto: 0,
            });
        };

        // Cargar configuración inicial
        loadConfig();

        return {
            parkingName,
            vehicleTypes,
            updateParkingName,
            saveVehicleType,
            deleteVehicleType,
            addVehicleType,
        };
    },
};
</script>

<style scoped>
.config-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 40px 20px;
    padding-bottom: 0;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f9f9f9;
    align-items: center;
    justify-content: center;
}

.config-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 24px;
    font-weight: bold;
}

.config-subtitle {
    font-size: 20px;
    margin: 20px 0 10px;
    text-align: center;
    font-weight: 700;
}

.form-group {
    margin: 15px 0;
    display: flex;
    gap: 10px;
    align-items: center;
}

.inputField {
    flex: 1;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.tarifas-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
}

th {
    color: #3742FA;
}

.tarifas-table th,
.tarifas-table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ddd;
}

.btn {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
}

.btn-save {
    background-color: #38b000;
    color: #fff;
}

.guardar-eliminar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.btn-delete {
    background-color: #dd0000;
    color: #fff;
}

.btn-add {
    background-color: #3742FA;
    color: #fff;
    margin-top: 5px;
    font-size: 15px;
    margin-left: 20px;
}

.btn:hover {
    opacity: 0.9;
}
</style>
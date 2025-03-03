import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function Grafico_SJF({ procesos }) {
    // Ordenar procesos por tiempo de llegada inicialmente
    const procesosOrdenados = [...procesos].sort((a, b) => a.tiempoLlegada - b.tiempoLlegada);
    
    let tiempoActual = 0;
    let ganttData = [];
    let tiempos = [];
    let procesosPendientes = [...procesosOrdenados];

    while (procesosPendientes.length > 0) {
        // Filtrar procesos que han llegado hasta el tiempo actual
        let disponibles = procesosPendientes.filter(p => Number(p.tiempoLlegada) <= tiempoActual);
        
        if (disponibles.length === 0) {
            // Si no hay procesos disponibles, avanzar al siguiente proceso más cercano
            tiempoActual = Math.min(...procesosPendientes.map(p => Number(p.tiempoLlegada)));
            disponibles = procesosPendientes.filter(p => Number(p.tiempoLlegada) <= tiempoActual);
        }

        // Seleccionar el proceso con la ráfaga más corta
        disponibles.sort((a, b) => a.rafaga - b.rafaga);
        let proceso = disponibles[0];

        const inicio = tiempoActual;
        const fin = inicio + Number(proceso.rafaga);
        const tiempoEspera = inicio - Number(proceso.tiempoLlegada);
        const tiempoSistema = fin - Number(proceso.tiempoLlegada);

        ganttData.push({
            nombre: proceso.nombre,
            inicio: inicio,
            fin: fin,
            duracion: Number(proceso.rafaga)
        });

        tiempos.push({
            nombre: proceso.nombre,
            tiempoEspera,
            tiempoSistema
        });

        tiempoActual = fin;
        procesosPendientes = procesosPendientes.filter(p => p !== proceso);
    }

    // Calcular promedios
    const promedioEspera = tiempos.reduce((sum, p) => sum + p.tiempoEspera, 0) / tiempos.length;
    const promedioSistema = tiempos.reduce((sum, p) => sum + p.tiempoSistema, 0) / tiempos.length;

    return (
        <div>
            <h2>Gráfica de Gantt - SJF</h2>
            <BarChart width={800} height={400} data={ganttData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, tiempoActual]} />
                <YAxis dataKey="nombre" type="category" />
                <Tooltip />
                <Bar dataKey="inicio" stackId="a" fill="transparent" />
                <Bar dataKey="duracion" stackId="a" fill="#8884d8" />
            </BarChart>

            <h3>Tiempos de Espera y de Sistema</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Proceso</th>
                        <th>Tiempo de Espera</th>
                        <th>Tiempo de Sistema</th>
                    </tr>
                </thead>
                <tbody>
                    {tiempos.map(({ nombre, tiempoEspera, tiempoSistema }) => (
                        <tr key={nombre}>
                            <td>{nombre}</td>
                            <td>{tiempoEspera}</td>
                            <td>{tiempoSistema}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td><b>Promedio</b></td>
                        <td><b>{promedioEspera.toFixed(2)}</b></td>
                        <td><b>{promedioSistema.toFixed(2)}</b></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

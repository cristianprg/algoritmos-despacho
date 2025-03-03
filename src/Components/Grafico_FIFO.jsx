import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function Grafico_FIFO({ procesos }) {
    // Ordenar procesos por tiempo de llegada
    const procesosOrdenados = [...procesos].sort((a, b) => a.tiempoLlegada - b.tiempoLlegada);
    
    let tiempoActual = 0;
    let ganttData = [];
    let tiempos = [];
    
    procesosOrdenados.forEach(proceso => {
        // Si el tiempo actual es menor al tiempo de llegada, avanzar el reloj
        if (tiempoActual < Number(proceso.tiempoLlegada)) {
            tiempoActual = Number(proceso.tiempoLlegada);
        }
        
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
    });

    // Calcular promedios
    const promedioEspera = tiempos.reduce((sum, p) => sum + p.tiempoEspera, 0) / tiempos.length;
    const promedioSistema = tiempos.reduce((sum, p) => sum + p.tiempoSistema, 0) / tiempos.length;

    return (
        <div>
            <h2>Gráfica de Gantt - FIFO</h2>
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

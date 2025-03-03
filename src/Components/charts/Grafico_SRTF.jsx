import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function Grafico_SRTF({ procesos }) {
    let procesosRestantes = procesos.map(p => ({ ...p, restante: Number(p.rafaga) }));
    let tiempoActual = 0;
    let ganttData = [];
    let tiempos = {};
    let ejecuciones = [];

    while (procesosRestantes.some(p => p.restante > 0)) {
        let procesosListos = procesosRestantes.filter(p => p.tiempoLlegada <= tiempoActual && p.restante > 0);
        
        if (procesosListos.length > 0) {
            let proceso = procesosListos.reduce((prev, curr) => {
                if (prev.restante < curr.restante) return prev;
                if (prev.restante > curr.restante) return curr;
                return prev.tiempoLlegada <= curr.tiempoLlegada ? prev : curr;
            });
            
            let ejecucion = ejecuciones.length > 0 ? ejecuciones[ejecuciones.length - 1] : null;

            if (!ejecucion || ejecucion.nombre !== proceso.nombre) {
                ejecuciones.push({ nombre: proceso.nombre, inicio: tiempoActual, duracion: 1 });
            } else {
                ejecucion.duracion += 1;
            }
            
            proceso.restante -= 1;
            tiempoActual++;
            
            if (proceso.restante === 0) {
                const tiempoEspera = tiempoActual - proceso.tiempoLlegada - Number(proceso.rafaga);
                const tiempoSistema = tiempoActual - proceso.tiempoLlegada;
                tiempos[proceso.nombre] = { tiempoEspera, tiempoSistema };
            }
        } else {
            tiempoActual++;
        }
    }

    ganttData = ejecuciones.map(({ nombre, inicio, duracion }) => ({ nombre, inicio, duracion }));

    const promedioEspera = Object.values(tiempos).reduce((sum, p) => sum + p.tiempoEspera, 0) / procesos.length;
    const promedioSistema = Object.values(tiempos).reduce((sum, p) => sum + p.tiempoSistema, 0) / procesos.length;
    
    return (
        <div className="chart-info">
            <h2>Gráfica de Gantt - SRTF</h2>
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
                    {Object.entries(tiempos).map(([nombre, { tiempoEspera, tiempoSistema }]) => (
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

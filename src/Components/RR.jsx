import { useState } from "react";
import { Grafico_RR } from "./Grafico_RR";

export function RR() {
    const [procesos, setProcesos] = useState([{ id: 1, nombre: "Proceso 1", rafaga: 0, tiempoLlegada: 0 }]);
    const [quantum, setQuantum] = useState(1);
    const [mostrarGrafico, setMostrarGrafico] = useState(false);

    const agregarProceso = () => {
        const nuevoId = procesos.length + 1;
        setProcesos([...procesos, { id: nuevoId, nombre: `Proceso ${nuevoId}`, rafaga: "", tiempoLlegada: "" }]);
    };

    const actualizarProceso = (id, campo, valor) => {
        setProcesos(procesos.map(proceso => proceso.id === id ? { ...proceso, [campo]: valor } : proceso));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMostrarGrafico(true);
    };

    return (
        <div className="outer">
            <h1 className="main_title">Algoritmo RR</h1>
            <form onSubmit={handleSubmit} className="main_form">
                <div className="form_process_container">
                    <label className="label_enter">Quantum</label>
                    <input 
                        type="number" 
                        value={quantum} 
                        onChange={(e) => setQuantum(Math.max(1, Number(e.target.value)))} 
                        className="input_cell"
                        min="1"
                    />
                </div>
                {procesos.map((proceso) => (
                    <div key={proceso.id} className="form_process_container">
                        <h2 className="process_name">{proceso.nombre}</h2>
                        <div className="sub_form">
                            <label className="label_enter">Ráfaga</label>
                            <input 
                                type="text" 
                                value={proceso.rafaga} 
                                onChange={(e) => actualizarProceso(proceso.id, "rafaga", e.target.value)}
                                className="input_cell"
                            />
                            <label className="label_enter">Tiempo de llegada</label>
                            <input 
                                type="text" 
                                value={proceso.tiempoLlegada} 
                                onChange={(e) => actualizarProceso(proceso.id, "tiempoLlegada", e.target.value)}
                                className="input_cell" 
                            />
                        </div>
                    </div>
                ))}
                <button type="button" onClick={agregarProceso} className="form_button">Agregar Proceso</button>
                <button type="submit" className="form_button">Crear</button>
            </form>
            {mostrarGrafico && <Grafico_RR procesos={procesos} quantum={quantum} />}
        </div>
    );
}

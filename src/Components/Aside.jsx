export function Aside({procesos, setProcesos, setMostrarGrafico, form}) {

    const agregarProceso = () => {
        console.log("🔹 Botón presionado, ejecutando agregarProceso...");
        setProcesos((prevProcesos) => {
            const nuevoId = prevProcesos.length + 1;
            const nuevoProceso = { id: nuevoId, nombre: `Proceso ${nuevoId}`, rafaga: 0, tiempoLlegada: 0, prioridad: 0 };
            console.log("✅ Agregando proceso:", nuevoProceso);
            return [...prevProcesos, nuevoProceso];
        });
    };

    const actualizarProceso = (id, campo, valor) => {
        if (valor >= 0 || valor === "") {
            setProcesos((prevProcesos) =>
                prevProcesos.map((proceso) =>
                    proceso.id === id ? { ...proceso, [campo]: valor } : proceso
                )
            );
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMostrarGrafico(true);
    };

    return (
        <aside className="aside">
            <form onSubmit={handleSubmit} className="main_form">
                <div className="processButtons">
                    <button 
                        type="button" 
                        onClick={agregarProceso} 
                        className="form_button"
                    >
                        Agregar Proceso
                    </button>
                    <button type="submit" className="form_button">Crear</button>
                </div>
                {procesos.map((proceso) => (
                    <div key={proceso.id} className="form_process_container">
                        <h2 className="process_name">{proceso.nombre}</h2>
                        <div className="sub_form">
                            <label className="label_enter">Ráfaga</label>
                            <input 
                                type="number" 
                                value={proceso.rafaga} 
                                onChange={(e) => actualizarProceso(proceso.id, "rafaga", e.target.value === "" ? "" : Number(e.target.value))}
                                className="input_cell"
                                min="0"
                                onWheel={(e) => e.target.blur()}
                            />
                            <label className="label_enter">Tiempo de llegada</label>
                            <input 
                                type="number" 
                                value={proceso.tiempoLlegada} 
                                onChange={(e) => actualizarProceso(proceso.id, "tiempoLlegada", e.target.value === "" ? "" : Number(e.target.value))}
                                className="input_cell" 
                                min="0"
                                onWheel={(e) => e.target.blur()}
                            />
                            <label className="label_enter">Prioridad</label>
                            <input 
                                type="number" 
                                value={proceso.prioridad} 
                                onChange={(e) => actualizarProceso(proceso.id, "prioridad", e.target.value === "" ? "" : Number(e.target.value))}
                                className="input_cell"  
                                disabled={form !== "PRIORIDAD"}
                                min="0"
                                onWheel={(e) => e.target.blur()}
                            />
                        </div>
                    </div>
                ))}
            </form>
            {console.log("📌 Procesos en el render:", procesos)}
        </aside>
    );
}

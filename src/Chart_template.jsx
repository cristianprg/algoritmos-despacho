import { Grafico_FIFO } from "./Components/charts/Grafico_FIFO";
import { Grafico_SJF } from "./Components/charts/Grafico_SJF";
import { Grafico_Prioridad } from "./Components/charts/Grafico_Prioridad";
import { Grafico_SRTF } from "./Components/charts/Grafico_SRTF";

export function Chart_template({ procesos, mostrarGrafico, form }) {

    const selectAlgorithm = (form) => {
        switch (form) {
            case 'FIFO':
                return <Grafico_FIFO procesos={procesos} />;
            case 'SJF':
                return <Grafico_SJF procesos={procesos}/>;
            case 'PRIORIDAD':
                return <Grafico_Prioridad procesos={procesos} />;
            case 'SRTF':
                return <Grafico_SRTF procesos={procesos} />;
            default:
                return null;
        }
    }

    return (
        <div>
            <h2>Gráfico {form}</h2>
            {mostrarGrafico && selectAlgorithm(form)}
        </div>
    );
}

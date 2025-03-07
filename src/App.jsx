import { FIFO } from "./Components/FIFO"
import { SJF } from "./Components/SJF"
import { useState } from "react"
import { PRIORIDAD } from "./Components/PIRORIDAD"
import { SRTF } from "./Components/SRTF"
import { RR } from "./Components/RR"
import { Aside } from "./Components/Aside"
import './App.css'
import { Chart_template } from "./chart_template"

function App() {

  const [procesos, setProcesos] = useState([{ id: 1, nombre: "Proceso 1", rafaga: 0, tiempoLlegada: 0 }]);
  const [mostrarGrafico, setMostrarGrafico] = useState(false);
  const [form, setForm] = useState(null)

  const handleClickFIFO = () => {
    setForm('FIFO')
  }

  const handleClickSJF = () => {
    setForm('SJF')
  }

  const handleClickPRIORIDAD = () => {
    setForm('PRIORIDAD')
  }

  const handleClickSRTF = () => {
    setForm('SRTF')
  }

  return (
    <>
      <nav className="top-nav">
        <h1>SELECTOR DE ALGORITMOS</h1>
        <div className="algorithms">
            <button onClick={handleClickFIFO} className="nav_button">FIFO</button>
            <button onClick={handleClickSJF} className="nav_button">SJF</button>
            <button onClick={handleClickPRIORIDAD} className="nav_button">PRIORIDAD</button>
            <button onClick={handleClickSRTF} className="nav_button">SRTF</button>
        </div>
      </nav>
      <main>
        <Aside procesos={procesos} setProcesos={setProcesos} setMostrarGrafico={setMostrarGrafico} form={form}/>
        <Chart_template procesos={procesos} mostrarGrafico={mostrarGrafico} form={form}/>
        
      </main>
    </>
  )
}

export default App

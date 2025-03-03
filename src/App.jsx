import { FIFO } from "./Components/FIFO"
import { SJF } from "./Components/SJF"
import { useState } from "react"
import './App.css'
import { PRIORIDAD } from "./Components/PIRORIDAD"
import { SRTF } from "./Components/SRTF"
import { RR } from "./Components/RR"

function App() {

  const [form, setForm] = useState(null)

  const handleClickFIFO = () => {
    setForm('FIFO')
  }

  const handleClickSJF = () => {
    setForm('SJF')
  }

  const handleClickPRIORIDAD = () => {
    setForm('PRIO')
  }

  const handleClickSRTF = () => {
    setForm('SRTF')
  }

  const handleClickRR = () => {
    setForm('RR')
  }

  const controlForm = () => {
    switch(form){
      case 'FIFO':
        return <FIFO />
      case 'SJF':
        return  <SJF />
      case 'PRIO':
        return <PRIORIDAD />
      case 'SRTF':
        return <SRTF />
      case 'RR':
        return  <RR />
      default: break
    }
  }

  return (
    <>
      <h1>Selector de algoritmos</h1>
      <ul>
        <li>
          <button onClick={handleClickFIFO}>FIFO</button>
        </li>
        <li>
          <button onClick={handleClickSJF}>SJF</button>
        </li>
        <li>
          <button onClick={handleClickPRIORIDAD}>Piroridad</button>
        </li>
        <li>
          <button onClick={handleClickSRTF}>SRTF</button>
        </li>
        <li>
          <button onClick={handleClickRR}>RR</button>
        </li>
      </ul>
      {
        form && 

        <div>
          {
            controlForm(form)
          }
        </div>

      }
    </>
  )
}

export default App

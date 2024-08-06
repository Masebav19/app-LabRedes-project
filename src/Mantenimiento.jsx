import { useState } from "react"
import Inicio from './newMaintenimiento.jsx'
import Fin from './finishMantenimiento.jsx'
import axios from 'axios'

function Mantenimiento({SetLog}){
    const [state,SetState] = useState("None")
    const [devices,SetDevices] = useState(undefined)
    const [FilterValue,SetFilterValue]= useState(undefined)

    function handleInicio(e){
        requestServer("newmantenimiento").then(devices=>{
            const SetValue = new Set(devices.map((newValue)=>{return newValue.Marca}))
                let data = [];
                SetValue.forEach((element)=>{
                    data.push({Marca: element})
            }) 
            SetFilterValue(data)
            SetDevices(devices)
            SetState("Inicio")
        })
    }
    function handleFin(){
        requestServer("endmantenimiento").then(devices=>{
            SetDevices(devices)
            SetState("Fin")
        })
    }
    async function requestServer (type){
        const result = await axios.get(`http://172.31.36.30:4000/api/${type}`)
        return result.data
    }
    return(
        <>
            <span className="Nav-Container">
                {(state === "None" || state === "Inicio") &&
                    <nav onClick={handleInicio} className="Navigation">
                        <h4>Inicio</h4>
                        {state === "Inicio" && devices && <Inicio
                            SetLog = {SetLog}
                            SetState = {SetState}
                            data= {devices}
                            FilterValue = {FilterValue}
                        />}
                    </nav>
                }
                {(state === "None" || state === "Fin") &&
                    <nav onClick={handleFin} className="Navigation">
                        <h4>Finalización</h4>
                    
                    {state === "Fin" && devices && <Fin
                        SetLog = {SetLog}
                        SetState = {SetState}
                        devices={devices}
                    />}
                </nav>
                }
                
            </span>
            
        </>
    )
}

export default Mantenimiento
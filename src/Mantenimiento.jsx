import { useState } from "react"
import Inicio from './newMaintenimiento.jsx'
import Fin from './finishMantenimiento.jsx'

function Mantenimiento({SetLog}){
    const [state,SetState] = useState("None")
    function handleInicio(){
        
    }
    function handleFin(){
        
    }
    async function requestServer (type){
        const result = await axios.get(`http://172.31.36.30:4000/api/${type}`)
        return result.data
    }
    return(
        <>
        <span className="Nav-Container">
            <nav onClick={handleInicio} className="Navigation">
                Inicio
                {state === "Inicio" && <Inicio
                    SetLog = {SetLog}
                    SetState = {SetState}
                />}
            </nav>
            <nav onClick={handleFin}className="Navigation">
                Fin
                {state === "Fin" && <Fin
                    SetLog = {SetLog}
                    SetState = {SetState}
                />}
            </nav>
        </span>
            
        </>
    )
}

export default Mantenimiento
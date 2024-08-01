import { useEffect, useState } from 'react';
import Menu from './menu.jsx'
import Prestamo from './Prestamo.jsx'
import Devolucion from './Devolucion.jsx';
import MainDetalle from './MainDetalle.jsx'
import axios from 'axios'

function Panel({SetLog}){
    const [menuAction,SetAction] = useState("Menu")
    const [data,setData] = useState(undefined)
    const [FilterValue,SetFilterValue]= useState(undefined)
    useEffect(()=>{
        if (menuAction == "Prestamo"){
            requestServer("Prestamo").then((value)=>{
                const SetValue = new Set(value.map((newValue)=>{return newValue.Marca}))
                let data = [];
                SetValue.forEach((element)=>{
                    data.push({Marca: element})
                }) 
                SetFilterValue(data)
                setData(value)
            })
        }else if (menuAction == "Devolucion"){
            requestServer("Devolucion").then((value)=>{
                setData(value)
            })
        }
    },[menuAction])

    async function requestServer (type){
        const result = await axios.get(`http://172.31.36.30:4000/api/${type}`)
        return result.data
    }
    return(
        <>
           {menuAction==="Menu"&&<Menu
            SetAction= { SetAction }
           /> }
           {menuAction==="Prestamo" && data && <Prestamo
            data = {data}
            FilterValue = {FilterValue}
            SetLog = {SetLog}
           />}
           {menuAction==="Devolucion" && data && <Devolucion
            data = {data}
            SetLog = {SetLog}
           />}
           {menuAction === "Detalle" && <MainDetalle
           SetLog={SetLog}
           />}
           
        </>
    );
}

export default Panel
import { useState, useEffect } from "react";
import axios from 'axios'

function Inicio({SetLog,SetState,data,FilterValue}){
    const [newData, setNewData]= useState(data)
    const [IpLists,SetIps]= useState(newData.map((element)=>{return {Id: element.Id,Especificaciones:element.Especificaciones}}))
    function handleFilter(e){
        const form = e.target.value;
        let newFilter = data.map((element)=>{
            if(element.Marca === form) {return element}
        })
        newFilter = newFilter.filter((element)=>{
            return element!==undefined
        })
        setNewData(newFilter)
    }

    function HandleIps(e){
        const Model = e.target.value;
        const IpFilter = newData.filter((element)=>{
            return element.Modelo === Model
        })
        SetIps(IpFilter)
    }

    useEffect(()=>{
        const newIps = newData.map((element)=>{return {Id: element.Id,Especificaciones:element.Especificaciones}})
        SetIps(newIps) 
    },[newData])
    function handleMaintenance(e){
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const Formdata = Object.fromEntries(formData.entries())
        const {Name, email, Model,DirIp,Actividades} = Formdata;
        requestServer(Name, email, Model,DirIp,Actividades).then(result=>{
            if (result?.Nombre=== Name){
                alert(`Se empieza el mantenimietno de : ${result.Modelo}
                    Persona encargada: ${result.Nombre}`)
                SetLog("NoLog")
            }else{
                alert("Algo sucedio :( revisa bien los datos ingresados")
                SetLog("NoLog")
            }
            
        }).catch(()=>{
            alert("Algo sucedio :( revisa bien los datos ingresados")
            SetLog("NoLog")
        })
    }
    async function requestServer (Name, email, Model,DirIp,Actividades){
        const result = await axios.post("http://172.31.36.30:4000/api/mantenimiento/new",{
            Nombre:Name,
            email: email,
            Modelo: Model,
            Especificaciones: DirIp,
            Actividades: Actividades
        })
        return result.data
    }
    return(
        <>
            <span>
            <header>
                <h1>Laboratorio de redes industriales</h1>
            </header>
            <article>
                <h2>Plataforma para mantenimiento de equipos</h2>
                <h4>Ingrese todos los campos</h4>
            </article>  
            <span>
                <form action="POST" onSubmit={handleMaintenance}>
                    <fieldset>
                        <legend>Filtro</legend>
                        <div className="group">
                            <img src="../public/filter.svg" alt="Filtro" className="icon" />
                            <input list="DeviceBrand" name="DeviceBrand" onChange={handleFilter} 
                            title="Puede buscar los dispositivos por Marca, este campo es opcional"
                            placeholder="Marca"
                            className="input"/>
                            <datalist id="DeviceBrand">
                                {
                                FilterValue.map((element)=>{

                                        return(
                                            <option key={element.Marca} value={element.Marca}></option>
                                        )
                                    
                                })
                                
                                }
                            </datalist>
                        </div>
                        
                    </fieldset>
                    <fieldset>
                        <legend>Datos del Mantenimiento</legend>
                        <div className="group">
                            <img src="../public/user.svg" alt="Nombre" className="icon" />
                            <input type="text" name="Name" placeholder="Nombre" 
                            required title="Nombre y apellido" className="input"/>
                        </div>
                        <div className="group">
                            <img src="../public/email.svg" alt="email" className="icon" />
                            <input type="email" name="email" 
                            placeholder="email" required title="email" className="input"/>
                        </div>
                        <div className="group">
                            <img src="../public/PLC.svg" alt="Modelo" className="icon" />
                            <input list="modeloList" name="Model" 
                            placeholder="Modelo" required onChange={HandleIps}
                            className="input"/>
                            <datalist id="modeloList">
                            {
                                newData.map(element=>{
                                    if(element?.Marca){
                                        return(
                                            <option key={element.Id} value={element.Modelo}></option>
                                        )
                                    }
                                    
                                })
                            }
                            </datalist>
                        </div>
                        <div className="group">
                            <img src="../public/IP.svg" alt="" className="icon" />
                            <input list="IpList" name="DirIp" placeholder="Dirección IP/Otros" 
                            title="Dirección IP del dispositivo" autoComplete="off" className="input"/>
                                <datalist id="IpList">
                                    {
                                            IpLists.map(element=>{
                                                if(element?.Especificaciones){
                                                    return(
                                                        <option key={`${element.Id}-${element.Especificaciones}`} value={element.Especificaciones}></option>
                                                    )
                                                }
                                                
                                            })   
                                    }
                            </datalist>
                        </div>
                        <div className="group">
                            <img src="../public/maintenance.svg" alt="" className="icon" />
                            <input type="text" name="Actividades" placeholder="Actividades a realizar" 
                            title="Si el dispositivo prestado tiene módulo de expasion colocar el modelo del mismo" 
                            required className="input"/>
                        </div>
 
                        <div className="group-button">
                            <button>Registrar mantenimiento</button>
                        </div>
                        
                    </fieldset>
                </form>
            </span>     
            </span>
        </>
    )
}

export default Inicio
import bcrypt from "bcryptjs-react"
import axios from 'axios'

function LogIn({SetLog}){
    
    const RequestLogIn=async (password)=>{
        const Crycptpassword = bcrypt.hashSync(password,10)
        const result = await axios.post("http://172.31.36.30:4000/api/LogIn",{
            User: 'App',
            Password: Crycptpassword
        })
        return result.data
        
    }
    function HandleSubmit(e){
        e.preventDefault()
        const form = e.target;
        const formData = new FormData(form)
        const Formdata = Object.fromEntries(formData.entries())
        RequestLogIn(Formdata.InputPaswoord).then((resul)=>{
            resul.LogIn === "Succesfull" ? SetLog("Login"): SetLog("NoLog")
        })
    }
    return (
        <>
            <header>
                <h1>Laboratorio de redes industriales</h1>
            </header>
            <article>
                <h2>Plataforma de prestamos de equipos</h2>
                <h3>Ingrese la contraseña</h3>
            </article>
            <span>
                <form  method="POST" onSubmit={HandleSubmit}>
                    <fieldset>
                        <label htmlFor="InputPaswoord"></label>
                        <div className="group">
                            <img  className="icon" src="../public/password.svg" alt="Password" />
                            <input className="input" type="password" name='InputPaswoord' placeholder="Password"/>
                        </div>
                        
                        <div className="password-button">
                        <button>Ingresar</button>
                        </div>
                        
                    </fieldset>
                </form>
            </span>
        </>
    )
}

export default LogIn
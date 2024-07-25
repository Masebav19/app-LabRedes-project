import { useState } from 'react'
import LogIn from './LogIn.jsx'
import Panel from './panel.jsx'

function App() {
  const [Log,SetLog]= useState("NoLog")
  return (
    <>
      <div className="Major-container">
        {Log === "NoLog" &&<LogIn 
        SetLog = {SetLog}
        />}
        {Log === "Login" && <Panel
        SetLog = {SetLog}
        />}        
      </div>
    </>
  )
}

export default App

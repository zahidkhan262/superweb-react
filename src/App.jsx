import React from "react"
import './App.css'

const App = () => {

  const style = {
    color: 'green'
  }

  const data = 'Hello Superweb'

  return (
    <>
      <div className="text-primary">
        <h1 className="super-web" style={style}>{data}</h1>
        <p style={{ textDecoration: 'underline' }}>We are learning react js.</p>
      </div>
    </>
  )
}

export default App


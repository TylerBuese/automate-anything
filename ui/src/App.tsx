import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BuildApp from './Components/App/App'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <PublicRoutes />
      </BrowserRouter>
    </>
  )
}

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/app' element={<BuildApp />}/>
      </Routes>
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<Login/>} path='/login'/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
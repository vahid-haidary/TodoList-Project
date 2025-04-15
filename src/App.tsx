import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route element={<Home/>} path='/home'/>
      <Route element={<Login/>} path='/login'/>
      <Route element={<Navigate to='/login'/>} path='/'  />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
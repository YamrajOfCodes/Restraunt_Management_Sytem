import React from 'react'
import Login from './Pages/Login/Login'
import { Route,Routes } from "react-router-dom"
import CookDashboard from './Pages/Cook/Cookpage'
import AdminDashboard from './Pages/Admin/adminDashboard'
import OwnerDashboard from './Pages/Owner/owenerDashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/cook' element={<CookDashboard/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
        <Route path='/owner' element={<OwnerDashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
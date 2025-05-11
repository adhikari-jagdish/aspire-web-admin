import AuthController from './auth/controller/auth_controller'
import DashboardController from './dashboard/controller/dashboard_controller'
import './App.css'
import { Routes, Route } from 'react-router-dom'



function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<AuthController />} />

        <Route path="/dashboard" element={<DashboardController />} />

      </Routes>
    </>
  )
}

export default App

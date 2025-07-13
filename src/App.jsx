import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlanDetailsPage from './pages/PlanDetailsPage'
import PaymentPage from './pages/PaymentPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/plan-details/:plan" element={<PlanDetailsPage />} />
      <Route path="/payment" element={<PaymentPage />} />
    </Routes>
  )
}

export default App
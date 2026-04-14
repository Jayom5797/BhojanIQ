import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Landing from './pages/Landing'
import Onboarding from './pages/Onboarding'
import Analyze from './pages/Analyze'
import DecisionResult from './pages/DecisionResult'
import MealHistory from './pages/MealHistory'
import HowItWorks from './pages/HowItWorks'

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/result" element={<DecisionResult />} />
          <Route path="/history" element={<MealHistory />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PatientProvider } from './components/context/PatientContext';
import Navbar from './components/shared/Navbar';
import Dashboard from './components/views/Dashboard';
import EmergencyMode from './components/Emergency/EmergencyMode';
import CRIs from './components/CRIs/CRIs';
import Drugs from './components/Drugs/Drugs';
import Protocols from './components/Protocols/Protocols';

export default function App() {

  return (
    <BrowserRouter>
      <PatientProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/emergency" element={<EmergencyMode />} />
              <Route path="/cris" element={<CRIs />} />
              <Route path="/drugs" element={<Drugs />} />
              <Route path="/protocols" element={<Protocols />} />
            </Routes>
          </main>
        </div>
      </PatientProvider>
    </BrowserRouter>

  )
}

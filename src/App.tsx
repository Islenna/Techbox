import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PatientProvider } from './components/context/PatientContext';
import Navbar from './components/shared/Navbar';
import Dashboard from './components/views/Dashboard';
import EmergencyMode from './components/Emergency/EmergencyMode';
import CRICore from './components/CRIs/CRICore';
import Drugs from './components/Drugs/Drugs';
import Protocols from './components/Protocols/Protocols';
import { Toaster } from '@/components/ui/sonner';

export default function App() {

  return (
    <BrowserRouter>
      <PatientProvider>
        <Toaster />
        <div className="min-h-screen bg-background text-foreground">
          <Navbar />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/emergency" element={<EmergencyMode />} />
              <Route path="/cris" element={<CRICore />} />
              <Route path="/drugs" element={<Drugs />} />
              <Route path="/protocols" element={<Protocols />} />
            </Routes>
          </main>
        </div>
      </PatientProvider>
    </BrowserRouter>

  )
}

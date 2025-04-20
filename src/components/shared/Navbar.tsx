import { Link } from "react-router-dom"
import { usePatient } from "../context/PatientContext"

export default function Navbar() {
    const { patientName, patientWeight } = usePatient()

    return (
        <nav className="w-full p-4 border-b bg-card text-foreground">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Left: App Title */}
                <h1 className="font-bold text-xl">TechBox</h1>

                {/* Center: Patient Info (conditionally shown) */}
                {patientName ? (
                    <div className="text-sm text-muted-foreground text-center">
                        {patientName} — {patientWeight} kg
                    </div>
                ) : (
                    <div />
                )}

                {/* Right: Links */}
                <div className="flex gap-4 text-sm">
                    <Link to="/cris" className="hover:underline">CRIs</Link>
                    <Link to="/drugs" className="hover:underline">Drugs</Link>
                    <Link to="/protocols" className="hover:underline">Protocols</Link>
                </div>
            </div>
        </nav>
    )
}

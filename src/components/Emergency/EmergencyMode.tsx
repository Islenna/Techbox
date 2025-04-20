import CPRCore from './CPRCore'
import { usePatient } from '../context/PatientContext'
import { Input } from '../ui/input'

function EmergencyMode() {
    const { patientWeight, setPatientWeight } = usePatient()

    return (
        <>
            {patientWeight === 0 && (
                <div className="mb-4">
                    <label htmlFor="quick-weight" className="text-sm font-medium">
                        Patient Weight (kg)
                    </label>
                    <Input
                        id="quick-weight"
                        type="number"
                        placeholder="Enter weight"
                        value={patientWeight || ""}
                        onChange={(e) => setPatientWeight(parseFloat(e.target.value) || 0)}
                        className="mt-1 w-32"
                    />
                </div>
            )}

            <CPRCore />
        </>
    )
}

export default EmergencyMode
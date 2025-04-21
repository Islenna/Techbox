import CPRCore from './CPRCore'
import { usePatient } from '../context/PatientContext'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'

function EmergencyMode() {
    const { patientWeight, setPatientWeight } = usePatient()
    const [tempWeight, setTempWeight] = useState("")

    return (
        <>
            {patientWeight === 0 && (
                <div className="mb-6 space-y-2 max-w-xs mx-auto text-center">
                    <label htmlFor="quick-weight" className="block text-sm font-medium">
                        Estimated Patient Weight (kg)
                    </label>
                    <Input
                        id="quick-weight"
                        type="number"
                        placeholder="Enter weight"
                        value={tempWeight}
                        onChange={(e) => setTempWeight(e.target.value)}
                        className="w-full"
                        autoFocus
                    />
                    <Button
                        className="w-full mt-2"
                        onClick={() => {
                            const parsed = parseFloat(tempWeight)
                            if (!isNaN(parsed) && parsed > 0) {
                                setPatientWeight(parsed)
                            } else {
                                alert("Please enter a valid weight.")
                            }
                        }}
                    >
                        Confirm & Start
                    </Button>
                </div>
            )}

            {patientWeight !== 0 && <CPRCore />}
        </>
    )
}

export default EmergencyMode

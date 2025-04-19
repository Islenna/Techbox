import { createContext, useContext, useState, ReactNode } from "react"

type PatientContextType = {
    name: string
    weight: number
    setName: (name: string) => void
    setWeight: (weight: number) => void
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

export function PatientProvider({ children }: { children: ReactNode }) {
    const [name, setName] = useState("")
    const [weight, setWeight] = useState(0)

    return (
        <PatientContext.Provider value={{ name, weight, setName, setWeight }}>
            {children}
        </PatientContext.Provider>
    )
}

export function usePatient() {
    const context = useContext(PatientContext)
    if (!context) {
        throw new Error("usePatient must be used within a PatientProvider")
    }
    return context
}

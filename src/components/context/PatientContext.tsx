// src/components/context/PatientContext.tsx

import React, { createContext, useState, useContext } from "react";

type PatientContextType = {
    patientName: string;
    patientWeight: number;
    setPatientName: (name: string) => void;
    setPatientWeight: (weight: number) => void;
};

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider = ({ children }: { children: React.ReactNode }) => {
    const [patientName, setPatientName] = useState("");
    const [patientWeight, setPatientWeight] = useState(0);

    return (
        <PatientContext.Provider
            value={{ patientName, patientWeight, setPatientName, setPatientWeight }}
        >
            {children}
        </PatientContext.Provider>
    );
};

export const usePatient = () => {
    const context = useContext(PatientContext);
    if (!context) {
        throw new Error("usePatient must be used within a PatientProvider");
    }
    return context;
};

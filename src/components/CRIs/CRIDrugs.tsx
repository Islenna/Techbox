export type CRIDrug = {
    name: string
    units: "mcg/kg/hr" | "mcg/kg/min" | "mg/kg/hr" | "mg/kg/min"
    minDose: number
    maxDose: number
    dilutionNote?: string
    concentration: number // in mcg or mg per mL
    displayConcentration: string
    preferredVolumeUnit: "mL/hr" | "mL/kg/hr"
}

export const CRIDrugLibrary: CRIDrug[] = [
    {
        name: "Fentanyl (50 mcg/mL)",
        units: "mcg/kg/hr",
        minDose: 2,
        maxDose: 20,
        concentration: 50,
        displayConcentration: "50 mcg/mL",
        preferredVolumeUnit: "mL/hr",
    },
    {
        name: "Ketamine (1 mg/mL)",
        units: "mcg/kg/min",
        minDose: 2,
        maxDose: 10,
        concentration: 1000,
        displayConcentration: "1 mg/mL",
        dilutionNote: "Dilute 0.1 mL ketamine in 9.9 mL saline to make 1 mg/mL",
        preferredVolumeUnit: "mL/hr",
    },
    // ...others
]

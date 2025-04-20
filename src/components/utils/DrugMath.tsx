export function calculateEpinephrine(weightKg: number, route: "IV" | "ET") {
    const base = 0.01 // mg/kg
    const dose = weightKg * (route === "ET" ? base * 10 : base)
    const concentration = 1 // mg/mL
    const volume = dose / concentration
    return {
        dose: +dose.toFixed(2),
        volume: +volume.toFixed(2),
    }
}

export function calculateAtropine(weightKg: number, route: "IV" | "ET") {
    const lowDose = weightKg * 0.04
    const highDose = weightKg * 0.054
    const concentration = 0.4 // mg/mL

    // If you want ET to be 2x or 3x, add a multiplier
    const multiplier = route === "ET" ? 1 : 1 // adjust if needed

    return {
        low: {
            dose: +(lowDose * multiplier).toFixed(2),
            volume: +((lowDose * multiplier) / concentration).toFixed(2),
        },
        high: {
            dose: +(highDose * multiplier).toFixed(2),
            volume: +((highDose * multiplier) / concentration).toFixed(2),
        },
    }
}

// components/Emergency/CprCore.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { speak } from "@/lib/speak"
import { usePatient } from "@/components/context/PatientContext"
import EmergencyDrugCalc from "@/components/Emergency/EmergencyDrugCalc"
import { EventLogEntry } from "@/components/types"
import { generateCPRReport } from "@/lib/pdf"
import VitalsIndicators from "@/components/Emergency/VitalsIndicator"
import { useCPRTimer } from "./useCPRTimer"

const CPRCore = () => {
    const { patientName } = usePatient()
    const { patientWeight } = usePatient()
    const [isRunning, setIsRunning] = useState(false)
    const [eventLog, setEventLog] = useState<EventLogEntry[]>([])
    const [atropineGiven, setAtropineGiven] = useState(false)

    const {
        elapsed,
        cycleCount,
        beat,
        breathe,
        audioRef,
        setElapsed,
        setCycleCount
    } = useCPRTimer(patientWeight, isRunning)



    const logEvent = (label: string) => {
        const timestamp = formatTime(elapsed)
        const realClock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

        setEventLog(prev => [...prev, { time: timestamp, realTime: realClock, label }])
    }


    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    }

    const handleReset = () => {
        setElapsed(0)
        setCycleCount(0)
        setIsRunning(false)
    }

    return (
        <div className="text-center space-y-4">
            <audio ref={audioRef} src="/tick.mp3" preload="auto" />
            <h2 className="text-3xl font-bold">CPR Timer</h2>
            <div className="text-6xl font-mono">{formatTime(elapsed)}</div>
            <p className="text-muted-foreground">Cycle {cycleCount + 1}</p>
            {/*Heartbeat and breath cues: */}
            <VitalsIndicators beat={beat} breathe={breathe} />

            <div className="flex justify-center gap-4 mt-4">
                <Button
                    variant={isRunning ? "secondary" : "default"}
                    onClick={() => setIsRunning(prev => !prev)}
                >
                    {isRunning ? "Pause" : "Start"}
                </Button>

                {!isRunning && elapsed > 0 && (
                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (confirm("Reset CPR timer?")) {
                                handleReset()
                            }
                        }}
                    >
                        Reset
                    </Button>
                )}
            </div>
            <Button onClick={() => logEvent("Intubated")} variant="outline">
                Log Intubation
            </Button>
            <details className="w-full text-left mt-4">
                <summary className="cursor-pointer text-sm font-semibold">Event Log</summary>
                <ul className="space-y-1 text-sm">
                    {eventLog.map((e, i) => (
                        <li key={i}>
                            <span className="font-mono text-muted-foreground">{e.time}</span>
                            {" / "}
                            <span className="text-xs text-muted-foreground">{e.realTime}</span>
                            {" — "}
                            {e.label}
                        </li>
                    ))}
                </ul>
            </details>

            <EmergencyDrugCalc
                patientWeight={patientWeight}
                logEvent={logEvent}
                atropineGiven={atropineGiven}
                setAtropineGiven={setAtropineGiven}
            />
            <Button
                variant="destructive"
                className="w-full text-lg py-6"
                onClick={() => logEvent("Shock delivered")}
            >
                Deliver Shock
            </Button>
            <Button
                variant="secondary"
                className="w-full text-lg py-6"
                onClick={() => {
                    logEvent("ROSC achieved")
                    setIsRunning(false)           // stop CPR timer/metronome
                    speak("Return of spontaneous circulation")
                }}
            >
                ROSC Achieved
            </Button>

            <Button
                onClick={() => {
                    const now = new Date().toLocaleTimeString()
                    generateCPRReport(
                        patientName,
                        patientWeight,
                        eventLog[0]?.realTime || "N/A",
                        now,
                        eventLog
                    )
                }}
            >
                Download Report
            </Button>



        </div>
    )
}

export default CPRCore

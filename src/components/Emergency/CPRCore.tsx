// components/Emergency/CprCore.tsx
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { speak } from "@/lib/speak"
import { Heart } from "lucide-react"
import { calculateAtropine, calculateEpinephrine } from "@/components/utils/DrugMath"
import { usePatient } from "@/components/context/PatientContext"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const CPRCore = () => {
    const { patientWeight } = usePatient()
    const [elapsed, setElapsed] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [cycleCount, setCycleCount] = useState(0)
    const [beat, setBeat] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const [eventLog, setEventLog] = useState<{ time: string; realTime: string; label: string }[]>([])

    const lastCycleTime = useRef(0)

    // Timer + cycle handler
    useEffect(() => {
        let timerInterval: NodeJS.Timeout | null = null;
        let beatInterval: NodeJS.Timeout | null = null;

        if (isRunning) {
            // 🕒 Timer (increments every 1 second)
            timerInterval = setInterval(() => {
                setElapsed(prev => {
                    const newTime = prev + 1;

                    if (newTime % 120 === 0 && newTime !== lastCycleTime.current) {
                        setCycleCount(c => c + 1);
                        speak("Two minutes. Time to rotate and check rhythm.");
                        lastCycleTime.current = newTime;
                    }

                    return newTime;

                });

            }, 1000);

            // 💓 Metronome (~110 bpm)
            beatInterval = setInterval(() => {
                setBeat(true);

                // Safely play tick
                if (audioRef.current) {
                    audioRef.current.pause(); // just in case
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(err => {
                        console.warn("Metronome audio play failed", err);
                    });
                }

                setTimeout(() => setBeat(false), 100);
            }, 545);

        }

        // Cleanup
        return () => {
            if (timerInterval) clearInterval(timerInterval);
            if (beatInterval) clearInterval(beatInterval);
        };
    }, [isRunning]);


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

            {/* Metronome Dot */}
            <div className="flex justify-center">
                <Heart
                    className={`w-12 h-12 transition-transform duration-100 ${beat ? "text-primary scale-125" : "text-muted scale-100"
                        }`}
                    fill={beat ? "currentColor" : "none"}
                />
            </div>
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
            <div className="mt-6 text-left">
                <h3 className="text-sm font-semibold mb-2">Event Log</h3>
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

            </div>

            <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value="drugs">
                    <AccordionTrigger className="text-lg font-semibold">
                        Emergency Drugs
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-wrap gap-2 justify-center">
                        {/* Epi IV */}
                        <Button
                            onClick={() => {
                                const { dose, volume } = calculateEpinephrine(patientWeight, "IV")
                                logEvent(`Epi (IV): ${dose} mg (${volume} mL)`)
                            }}
                        >
                            Epi (IV) – {calculateEpinephrine(patientWeight, "IV").volume} mL
                        </Button>

                        {/* Epi ET */}
                        <Button
                            onClick={() => {
                                const { dose, volume } = calculateEpinephrine(patientWeight, "ET")
                                logEvent(`Epi (ET): ${dose} mg (${volume} mL)`)
                            }}
                        >
                            Epi (ET) – {calculateEpinephrine(patientWeight, "ET").volume} mL
                        </Button>

                        {/* Atropine Low */}
                        <Button
                            onClick={() => {
                                const { low } = calculateAtropine(patientWeight, "IV")
                                logEvent(`Atropine (Low): ${low.dose} mg (${low.volume} mL)`)
                            }}
                        >
                            Atropine Low – {calculateAtropine(patientWeight, "IV").low.volume} mL
                        </Button>

                        {/* Atropine High */}
                        <Button
                            onClick={() => {
                                const { high } = calculateAtropine(patientWeight, "IV")
                                logEvent(`Atropine (High): ${high.dose} mg (${high.volume} mL)`)
                            }}
                        >
                            Atropine High – {calculateAtropine(patientWeight, "IV").high.volume} mL
                        </Button>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
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




        </div>
    )
}

export default CPRCore

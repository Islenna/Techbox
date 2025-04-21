import { useEffect, useRef, useState } from "react"
import { speak } from "@/lib/speak"
import { calculateEpinephrine } from "@/components/utils/DrugMath"
import { toast } from "sonner"

export function useCPRTimer(patientWeight: number, isRunning: boolean) {
    const [elapsed, setElapsed] = useState(0)
    const [cycleCount, setCycleCount] = useState(0)
    const [beat, setBeat] = useState(false)
    const [breathe, setBreathe] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const lastCycleTime = useRef(0)

    useEffect(() => {
        let timerInterval: NodeJS.Timeout | null = null
        let beatInterval: NodeJS.Timeout | null = null
        let breatheInterval: NodeJS.Timeout | null = null

        if (isRunning) {
            timerInterval = setInterval(() => {
                setElapsed(prev => {
                    const newTime = prev + 1

                    if (newTime % 120 === 0 && newTime !== lastCycleTime.current) {
                        setCycleCount(c => c + 1)
                        speak("Two minutes. Time to rotate and check rhythm.")
                        lastCycleTime.current = newTime
                    }

                    if (newTime % 240 === 0) {
                        const { dose, volume } = calculateEpinephrine(patientWeight, "IV")
                        toast("Epinephrine Reminder", {
                            description: `${dose} mg (${volume} mL IV at 1 mg/mL) – consider redosing now.`,
                            duration: 10000,
                        })
                    }

                    return newTime
                })
            }, 1000)

            beatInterval = setInterval(() => {
                setBeat(true)
                if (audioRef.current) {
                    audioRef.current.pause()
                    audioRef.current.currentTime = 0
                    audioRef.current.play().catch(console.warn)
                }
                setTimeout(() => setBeat(false), 100)
            }, 545)

            breatheInterval = setInterval(() => {
                setBreathe(true)
                setTimeout(() => setBreathe(false), 1000)
            }, 6000)
        }

        return () => {
            if (timerInterval) clearInterval(timerInterval)
            if (beatInterval) clearInterval(beatInterval)
            if (breatheInterval) clearInterval(breatheInterval)
        }
    }, [isRunning, patientWeight])

    return { elapsed, cycleCount, beat, breathe, audioRef, setElapsed, setCycleCount }
}

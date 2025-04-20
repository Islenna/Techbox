import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

const CprTimer = () => {
    const [elapsed, setElapsed] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [cycleCount, setCycleCount] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        let timer: NodeJS.Timeout

        if (isRunning) {
            timer = setInterval(() => {
                setElapsed(prev => {
                    const newTime = prev + 1
                    if (newTime % 120 === 0) {
                        setCycleCount(c => c + 1)
                        audioRef.current?.play()
                        alert("2 minutes! Time to rotate and assess.")
                    }
                    return newTime
                })
            }, 1000)
        }

        return () => clearInterval(timer)
    }, [isRunning])

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
            <audio ref={audioRef} src="/beep.mp3" preload="auto" />
            <h2 className="text-4xl font-bold tracking-tight">CPR Timer</h2>
            <div className="text-7xl font-mono">{formatTime(elapsed)}</div>
            <p className="text-muted-foreground">Cycle {cycleCount + 1}</p>
            <div className="flex justify-center gap-4 mt-4">
                <div className="flex justify-center gap-4 mt-4">
                    <Button
                        onClick={() => setIsRunning(prev => !prev)}
                        variant={isRunning ? "secondary" : "default"}
                    >
                        {isRunning ? "Pause" : "Start"}
                    </Button>

                    {!isRunning && elapsed > 0 && (
                        <Button
                            onClick={() => {
                                if (confirm("Reset CPR timer? This will clear the clock.")) {
                                    handleReset()
                                }
                            }}
                            variant="destructive"
                        >
                            Reset
                        </Button>
                    )}
                </div>

            </div>
        </div>
    )
}

export default CprTimer

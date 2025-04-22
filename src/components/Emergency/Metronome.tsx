import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"

const Metronome = () => {
    const [isOn, setIsOn] = useState(false)
    const [beat, setBeat] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isOn) {
            interval = setInterval(() => {
                setBeat(true)
                if (audioRef.current) {
                    audioRef.current.currentTime = 0
                    audioRef.current.play()
                }

                audioRef.current?.play()
                setTimeout(() => setBeat(false), 100)
            }, 545) // ~110 BPM
        }

        return () => clearInterval(interval)
    }, [isOn])

    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Audio element for tick */}
            <audio ref={audioRef} src="/tick.mp3" preload="auto" />

            {/* Visual Pulse */}
            <div
                className={`w-12 h-12 rounded-full ${beat ? "bg-primary scale-110" : "bg-muted"
                    } transition-all duration-100`}
            />

            {/* Toggle Button */}
            <Button
                variant={isOn ? "secondary" : "default"}
                onClick={() => {
                    if (!isOn && audioRef.current) {
                        // Mobile needs for sound
                        audioRef.current.play().catch(() => {
                        })
                    }

                    setIsOn(prev => !prev)
                }}
            >
                {isOn ? "Stop Metronome" : "Start Metronome"}
            </Button>
        </div>
    )
}

export default Metronome

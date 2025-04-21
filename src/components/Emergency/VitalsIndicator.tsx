import { Heart, Wind } from "lucide-react"

type Props = {
    beat: boolean
    breathe: boolean
}

export default function VitalsIndicators({ beat, breathe }: Props) {
    return (
        <div className="flex justify-center items-center gap-6">
            <Heart
                className={`w-12 h-12 transition-transform duration-100 ${beat ? "text-primary scale-125" : "text-muted scale-100"
                    }`}
                fill={beat ? "currentColor" : "none"}
            />
            <Wind
                className={`w-12 h-12 transition-transform duration-300 ${breathe ? "text-yellow-400 scale-110" : "text-muted scale-100"
                    }`}
                fill={breathe ? "currentColor" : "none"}
            />
        </div>
    )
}

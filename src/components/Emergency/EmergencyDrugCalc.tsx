import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { calculateEpinephrine, calculateAtropine } from "@/components/utils/DrugMath"
import { toast } from "sonner"

type EmergencyDrugCalcProps = {
    patientWeight: number
    logEvent: (label: string) => void
    atropineGiven: boolean
    setAtropineGiven: React.Dispatch<React.SetStateAction<boolean>>
}

const EmergencyDrugCalc = ({
    patientWeight,
    logEvent,
    atropineGiven,
    setAtropineGiven,
}: EmergencyDrugCalcProps) => {
    return (
        <Accordion type="single" collapsible className="w-full mt-4">
            <AccordionItem value="drugs">
                <AccordionTrigger className="text-lg font-semibold">
                    Emergency Drugs
                </AccordionTrigger>
                <AccordionContent className="flex flex-wrap gap-2 justify-center">

                    <Button
                        onClick={() => {
                            const { dose, volume } = calculateEpinephrine(patientWeight, "IV")
                            logEvent(`Epi (IV): ${dose} mg (${volume} mL)`)
                        }}
                    >
                        Epi (IV) – {calculateEpinephrine(patientWeight, "IV").volume} mL
                    </Button>

                    <Button
                        onClick={() => {
                            const { dose, volume } = calculateEpinephrine(patientWeight, "ET")
                            logEvent(`Epi (ET): ${dose} mg (${volume} mL)`)
                        }}
                    >
                        Epi (ET) – {calculateEpinephrine(patientWeight, "ET").volume} mL
                    </Button>

                    <Button
                        onClick={() => {
                            const { low } = calculateAtropine(patientWeight, "IV")
                            if (atropineGiven) {
                                toast("Atropine Reminder", {
                                    description: "RECOVER recommends a single dose only during CPR.",
                                    action: {
                                        label: "Give Anyway",
                                        onClick: () => {
                                            logEvent(`Atropine (Low): ${low.dose} mg (${low.volume} mL)`)
                                        },
                                    },
                                    dismissible: true,
                                })
                            } else {
                                setAtropineGiven(true)
                                logEvent(`Atropine (Low): ${low.dose} mg (${low.volume} mL)`)
                            }
                        }}
                    >
                        Atropine Low – {calculateAtropine(patientWeight, "IV").low.volume} mL
                    </Button>

                    <Button
                        onClick={() => {
                            const { high } = calculateAtropine(patientWeight, "IV")
                            if (atropineGiven) {
                                toast("Atropine Reminder", {
                                    description: "RECOVER recommends a single dose only during CPR.",
                                    action: {
                                        label: "Give Anyway",
                                        onClick: () => {
                                            logEvent(`Atropine (High): ${high.dose} mg (${high.volume} mL)`)
                                        },
                                    },
                                    dismissible: true,
                                })
                            } else {
                                setAtropineGiven(true)
                                logEvent(`Atropine (High): ${high.dose} mg (${high.volume} mL)`)
                            }
                        }}
                    >
                        Atropine High – {calculateAtropine(patientWeight, "IV").high.volume} mL
                    </Button>

                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default EmergencyDrugCalc

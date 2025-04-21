import { CRIDrug } from "@/components/CRIs/CRIDrugs"
import { calculateCRI } from "@/components/CRIs/calculateCRI"

import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

// props: { drug: CRIDrug, patientWeight: number }
export default function CRIDrugCard({ drug, patientWeight }: { drug: CRIDrug, patientWeight: number }) {
    return (
        <AccordionItem key={drug.name} value={drug.name}>
            <AccordionTrigger>{drug.name}</AccordionTrigger>
            <AccordionContent>
                {drug.dilutionNote && <p className="text-xs italic mb-2">{drug.dilutionNote}</p>}
                <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: (drug.maxDose - drug.minDose) / 1 + 1 }).map((_, i) => {
                        const dose = drug.minDose + i
                        const { rate, mLhr } = calculateCRI(dose, patientWeight, drug)
                        return (
                            <div key={dose} className="border rounded p-2 text-sm">
                                <div>{dose} {drug.units}</div>
                                <div>{rate} {drug.units.includes("mg") ? "mg/h" : "mcg/h"}</div>
                                <div>{mLhr} mL/h</div>
                            </div>
                        )
                    })}
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

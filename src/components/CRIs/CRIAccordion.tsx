import { CRIDrugLibrary } from '@/components/CRIs/CRIDrugs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { usePatient } from '@/components/context/PatientContext'
import CRIDrugCard from '@/components/CRIs/CRIDrugCard'


function CRIAccordion() {
    const { patientWeight } = usePatient()

    return (
        <Accordion type="single" collapsible className="w-full mt-4">
            {CRIDrugLibrary.map(drug => (
                <CRIDrugCard key={drug.name} drug={drug} patientWeight={patientWeight} />
            ))}
        </Accordion>

    )
}

export default CRIAccordion
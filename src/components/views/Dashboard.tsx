import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePatient } from "@/components/context/PatientContext";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

function Dashboard() {
    const { patientName, setPatientName, patientWeight, setPatientWeight } = usePatient();

    return (
        <Card className="max-w-md mx-auto mt-8 p-4">
            <CardHeader>
                <CardTitle>Patient Info</CardTitle>
                <CardDescription>Set name & weight for current emergency case</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <div>
                    <label htmlFor="patient-name" className="text-sm font-medium">
                        Name
                    </label>
                    <Input
                        id="patient-name"
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="e.g. Luna"
                    />
                </div>

                <div>
                    <label htmlFor="patient-weight" className="text-sm font-medium">
                        Weight (kg)
                    </label>
                    <Input
                        id="patient-weight"
                        type="number"
                        value={patientWeight}
                        onChange={(e) => setPatientWeight(parseFloat(e.target.value))}
                        placeholder="e.g. 4.2"
                    />
                </div>
            </CardContent>

            <CardFooter>
                <Button variant="destructive" className="w-full mt-2" asChild>
                    <Link to="/emergency">Enter Emergency Mode</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Dashboard;

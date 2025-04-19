import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../ui/card"
import { Link } from "react-router-dom"

function Dashboard() {
    return (
        <div className="flex justify-center items-center min-h-[80vh] p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Patient Info</CardTitle>
                    <CardDescription>Enter your patient's name and weight to begin.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-1">
                        <label htmlFor="patient-name" className="text-sm font-medium">
                            Patient Name
                        </label>
                        <Input id="patient-name" type="text" placeholder="e.g. Luna" />
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="patient-weight" className="text-sm font-medium">
                            Patient Weight (kg)
                        </label>
                        <Input id="patient-weight" type="number" placeholder="e.g. 4.2" />
                    </div>
                </CardContent>

                <CardFooter className="pt-4">
                    <Button variant="destructive" className="w-full" asChild>
                        <Link to="/emergency">Enter Emergency Mode</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Dashboard

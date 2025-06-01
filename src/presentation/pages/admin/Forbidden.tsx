import {AlertTriangle} from "lucide-react";
import {Link} from "react-router-dom";
import {Alert, AlertDescription, AlertTitle} from "@/presentation/components/ui/alert.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";

export default function Forbidden() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                <Alert variant="destructive">
                    <AlertTriangle className="h-5 w-5"/>
                    <AlertTitle>Zugriff verweigert</AlertTitle>
                    <AlertDescription>
                        Du hast keine Berechtigung, diese Seite aufzurufen.
                    </AlertDescription>
                </Alert>

                <div className="flex justify-center">
                    <Link to="/">
                        <Button variant="destructive">
                            Zur Startseite
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

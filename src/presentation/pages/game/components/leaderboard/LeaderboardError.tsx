import {Alert, AlertDescription, AlertTitle} from "@/presentation/components/ui/alert.tsx";
import {ReactNode} from "react";

export default function LeaderboardError(
    {message, title}: { message: string|ReactNode, title: string|ReactNode}) {
    return (
        <Alert>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>
                {message}
            </AlertDescription>
        </Alert>
    )
}
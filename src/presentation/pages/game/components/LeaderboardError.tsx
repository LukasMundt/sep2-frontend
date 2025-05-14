import {Alert, AlertDescription, AlertTitle} from "@/presentation/components/ui/alert.tsx";

export default function LeaderboardError(
    {category}: { category?: string }) {
    return (
        <Alert>
            <AlertTitle>Fehler beim Laden</AlertTitle>
            <AlertDescription>
                <p>Bei laden des Leaderboards für die Kategorie <b>{category??"?"}</b> ist leider ein Fehler aufgetreten.</p>
            </AlertDescription>
        </Alert>
    )
}
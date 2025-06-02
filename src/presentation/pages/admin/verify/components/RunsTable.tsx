import {components} from "@/data-domain/schema";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/presentation/components/ui/table.tsx";
import {runtimeToString} from "@/business-rules/runtime-to-string.ts";
import {useEffect, useState} from "react";
import GetUnverifiedRunsByGameAndCategory from "@/business-rules/get-unverified-runs-by-game-and-category.ts";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";
import {Alert, AlertTitle} from "@/presentation/components/ui/alert.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Check} from "lucide-react";
import {useIsMobile} from "@/presentation/hooks/use-mobile.ts";
import {toast} from "sonner";

export default function RunsTable({gameSlug, category}: {
    readonly gameSlug?: components["schemas"]["GameDto"]["slug"],
    readonly category?: components["schemas"]["Category"]["categoryId"]
}) {
    const isMobile = useIsMobile();

    const [runs, setRuns] = useState<components["schemas"]["RunReview"][] | undefined>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<undefined | boolean>(undefined);

    useEffect(() => {
        if (!loading && !error && runs === undefined && gameSlug != undefined && category != undefined) {
            setLoading(true);
            GetUnverifiedRunsByGameAndCategory(gameSlug, category).then(({success, data, errorMessage}) => {
                setRuns(data);
                setError(errorMessage != undefined || !success);
                if (errorMessage != undefined) {
                    toast.error(errorMessage);
                }
            }).catch(() => {
                setError(true);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [runs, gameSlug, category]);

    useEffect(() => {
        setError(false);
        setLoading(false);
        setRuns(undefined);
    }, [gameSlug, category]);

    if (gameSlug == undefined || category == undefined) {
        return <Alert>
            <AlertTitle>Bitte wähle Spiel und Kategorie</AlertTitle>
        </Alert>
    }

    if (error || loading || runs == undefined) {
        return <Skeleton className="h-20"/>;
    }


    return (<Table className="w-full">
        <TableHeader>
            <TableRow>
                <TableHead className="font-semibold">Spieler</TableHead>
                <TableHead className="font-semibold">Zeit</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead>#</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {runs.map((run, index) => (
                <TableRow key={index}>
                    <TableCell>{run.run.speedrunner}</TableCell>
                    <TableCell>{runtimeToString(run.run.runtime)}</TableCell>
                    <TableCell>{new Date(run.run.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <Button size={isMobile ? "icon" : "default"}>
                            <Check/>
                            <span className={isMobile ? "hidden" : ""}>Verifizieren</span>
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>)
}
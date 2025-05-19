import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/presentation/components/ui/table.tsx";
import {components} from "@/data-domain/schema";

export default function LeaderboardTable({runs}: { runs: components["schemas"]["RunDto"][] }) {

    function runtimeToString(runtime: components["schemas"]["Runtime"]): string {
        let string = runtime.hours.toFixed(0).padStart(2, "0") + ":";
        string += runtime.minutes.toFixed(0).padStart(2, "0") + ":";
        string += runtime.seconds.toFixed(0).padStart(2, "0");
        string += "." + runtime.milliseconds.toFixed(0).padStart(3, "0");
        return string;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[21px] font-semibold">#</TableHead>
                    <TableHead className="font-semibold">Spieler</TableHead>
                    <TableHead className="font-semibold">Zeit</TableHead>
                    <TableHead>Datum</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {runs.map((run, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{run.speedrunner}</TableCell>
                        <TableCell>{runtimeToString(run.runtime)}</TableCell>
                        <TableCell>{new Date(run.date).toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/presentation/components/ui/table.tsx";
import {Leaderboard, Runtime} from "@/data-domain";

type Runs = NonNullable<Leaderboard["runs"]>

export default function LeaderboardTable({runs}: { runs: Runs }) {

    function runtimeToString(runtime: Runtime): string {
        let string = "";
        if (runtime.hours > 0) {
            string += runtime.hours + ":";
        }
        string += runtime.minutes + ":";
        string += runtime.seconds;
        if (runtime.milliseconds > 0) {
            string += "." + runtime.milliseconds;
        }
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
                        <TableCell>{run.date.toLocaleDateString()}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
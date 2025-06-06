import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/presentation/components/ui/table.tsx";
import {components} from "@/data-domain/schema";
import {runtimeToString} from "@/business-rules/runtime-to-string.ts";
import {useIsAdmin} from "@/presentation/hooks/is-admin.ts";

export default function LeaderboardTable({runs}: { readonly runs: components["schemas"]["RunDto"][] }) {
    const isAdmin = useIsAdmin();

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
                        {isAdmin&&<TableCell></TableCell>}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
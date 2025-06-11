import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/presentation/components/ui/table.tsx";
import {components} from "@/data-domain/schema";
import LeaderboardRow from "@/presentation/pages/game/components/leaderboard/LeaderboardRow.tsx";

export default function LeaderboardTable({runs}: { readonly runs: components["schemas"]["RunDto"][] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[21px] font-semibold">#</TableHead>
                    <TableHead className="w-[21px] font-semibold">Video</TableHead>
                    <TableHead className="font-semibold">Spieler</TableHead>
                    <TableHead className="font-semibold">Zeit</TableHead>
                    <TableHead>Datum</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {runs.map((run, index) => (
                    <LeaderboardRow run={run} index={index} key={run.uuid}/>
                ))}
            </TableBody>
        </Table>
    );
}
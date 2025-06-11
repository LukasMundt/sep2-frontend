import {components} from "@/data-domain/schema";
import {TableCell, TableRow} from "@/presentation/components/ui/table.tsx";
import {runtimeToString} from "@/business-rules/runtime-to-string.ts";
import DeleteRunButton from "@/presentation/pages/game/components/leaderboard/DeleteRunButton.tsx";
import {useState} from "react";
import {useIsAdmin} from "@/presentation/hooks/is-admin.ts";
import VideoDialog from "@/presentation/components/VideoDialog.tsx";

export default function LeaderboardRow({run, index}: { readonly run: components["schemas"]["RunDto"], readonly index: number }) {
    const [disabled, setDisabled] = useState<boolean>(false);
    const isAdmin = useIsAdmin();

    return (
        <TableRow className={disabled ? "bg-muted text-muted-foreground" : ""}>
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell><VideoDialog videoLink={run.videoLink}/></TableCell>
            <TableCell>{run.speedrunner}</TableCell>
            <TableCell>{runtimeToString(run.runtime)}</TableCell>
            <TableCell>{new Date(run.date).toLocaleDateString()}</TableCell>
            {isAdmin && <TableCell><DeleteRunButton run={run} disabled={disabled} onDelete={setDisabled}/></TableCell>}
        </TableRow>
    );
}
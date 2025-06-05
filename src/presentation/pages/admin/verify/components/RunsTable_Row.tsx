import {components} from "@/data-domain/schema";
import {TableCell, TableRow} from "@/presentation/components/ui/table.tsx";
import {runtimeToString} from "@/business-rules/runtime-to-string.ts";
import VerifyButton from "@/presentation/pages/admin/verify/components/VerifyButton.tsx";
import {useState} from "react";
import DeclineButton from "@/presentation/pages/admin/verify/components/DeclineButton.tsx";
import {cn} from "@/presentation/lib/utils.ts";

export default function RunsTableRow({run}: { readonly run: components["schemas"]["RunReview"] }) {
    const [disabled, setDisabled] = useState<boolean>(false);

    return (
        <TableRow className={cn(disabled?"bg-muted text-muted-foreground":"")}>
            <TableCell>{run.run.speedrunner}</TableCell>
            <TableCell>{runtimeToString(run.run.runtime)}</TableCell>
            <TableCell>{new Date(run.run.date).toLocaleDateString()}</TableCell>
            <TableCell className="flex gap-2">
                <VerifyButton run={run} disabled={disabled} onVerify={setDisabled}/>
                <DeclineButton run={run} onDecline={setDisabled} disabled={disabled}/>
            </TableCell>
        </TableRow>
    );
}
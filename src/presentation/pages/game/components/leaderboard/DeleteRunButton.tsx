import {components} from "@/data-domain/schema";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {useIsMobile} from "@/presentation/hooks/use-mobile.ts";
import DeleteRun from "@/business-rules/delete-run.ts";
import {toast} from "sonner";

export default function DeleteRunButton({run, disabled, onDelete}: Readonly<{
    readonly disabled: boolean,
    readonly onDelete: (deleted: true) => void,
    readonly run: components["schemas"]["RunDto"]
}>) {
    const isMobile = useIsMobile();

    function handleDelete(uuid: components["schemas"]["RunDto"]["uuid"]) {
        DeleteRun(uuid)
            .then(({success, errorMessage}) => {
                if (success) {
                    onDelete(true);
                    toast.success("Run gelöscht");
                } else {
                    toast.error(errorMessage ?? "Run konnte nicht gelöscht werden.")
                }
            })
            .catch(() => {
                toast.error("Run konnte nicht gelöscht werden.")
            })
    }

    return (
        <Button disabled={disabled} onClick={() => handleDelete(run.uuid)} className="cursor-pointer">
            <Trash/> {!isMobile && "Löschen"}
        </Button>
    )
}
import {components} from "@/data-domain/schema";
import {useIsMobile} from "@/presentation/hooks/use-mobile.ts";
import {toast} from "sonner";
import {Button} from "@/presentation/components/ui/button.tsx";
import {X} from "lucide-react";
import DeclineUnverifiedRun from "@/business-rules/decline-unverified-run.ts";

export default function DeclineButton({run, onDecline, disabled}: {
    readonly run: components["schemas"]["RunReview"],
    readonly onDecline: (declined: boolean) => void,
    readonly disabled: boolean
}) {
    const isMobile = useIsMobile();

    function handleDecline(uuid: components["schemas"]["RunReview"]["uuid"]) {
        DeclineUnverifiedRun(uuid).then(({success, errorMessage}) => {
            if (success) {
                toast.success("Run abgelehnt")
                onDecline(true);
            } else {
                toast.error(errorMessage ?? "Fehler beim Ablehnen")
            }
        }).catch(() => {
            toast.error("Fehler beim Ablehnen")
        })
    }

    return <Button size={isMobile ? "icon" : "default"} onClick={() => handleDecline(run.uuid)} disabled={disabled}>
        <X/>
        <span className={isMobile ? "hidden" : ""}>Ablehnen</span>
    </Button>
}
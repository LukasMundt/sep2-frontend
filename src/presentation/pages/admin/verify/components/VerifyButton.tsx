import {Check} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import {components} from "@/data-domain/schema";
import {useIsMobile} from "@/presentation/hooks/use-mobile.ts";
import VerifyRun from "@/business-rules/verify-run";
import {toast} from "sonner";

export default function VerifyButton({run, onVerify, disabled}: {
    readonly run: components["schemas"]["RunReview"],
    readonly onVerify: (verified: boolean) => void,
    readonly disabled: boolean
}) {
    const isMobile = useIsMobile();

    function handleVerify(uuid: components["schemas"]["RunReview"]["run"]["uuid"]) {
        VerifyRun(uuid).then(({success, errorMessage}) => {
            if (success) {
                toast.success("Verifiziert")
                onVerify(true);
            } else {
                toast.error(errorMessage ?? "Fehler beim Verifizieren")
            }
        }).catch(() => {
            toast.error("Fehler beim Verifizieren")
        })
    }

    return <Button size={isMobile ? "icon" : "default"} onClick={() => handleVerify(run.run.uuid)} disabled={disabled}
                   className="cursor-pointer">
        <Check/>
        <span className={isMobile ? "hidden" : ""}>Verifizieren</span>
    </Button>

}

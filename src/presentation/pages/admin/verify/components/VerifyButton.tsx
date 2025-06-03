import {Check} from "lucide-react";
import {Button} from "@/presentation/components/ui/button.tsx";
import {components} from "@/data-domain/schema";
import {useIsMobile} from "@/presentation/hooks/use-mobile.ts";
import VerifyRun from "@/business-rules/verify-run";
import {toast} from "sonner";
import {useState} from "react";

export default function VerifyButton({run}: { readonly run: components["schemas"]["RunReview"] }) {
    const isMobile = useIsMobile();
    const [verified, setVerified] = useState<boolean>(false);

    function handleVerify(uuid: components["schemas"]["RunReview"]["uuid"]) {
        VerifyRun(uuid).then(({success, errorMessage}) => {
            if (success) {
                toast.success("Verifiziert")
                setVerified(true);
            } else {
                toast.error(errorMessage ?? "Fehler beim Verifizieren")
            }
        }).catch(() => {
            toast.error("Fehler beim Verifizieren")
        })
    }

    return <Button size={isMobile ? "icon" : "default"} onClick={() => handleVerify(run.uuid)} disabled={verified}>
        <Check/>
        <span className={isMobile ? "hidden" : ""}>Verifizieren</span>
    </Button>

}

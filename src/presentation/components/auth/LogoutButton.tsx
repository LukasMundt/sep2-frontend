import {Button} from "@/presentation/components/ui/button.tsx";
import {Popover, PopoverTrigger, PopoverContent} from "@/presentation/components/ui/popover.tsx";
import LogoutUser from "@/business-rules/auth/logout-user.ts";
import {toast} from "sonner";

export default function LogoutButton() {

    async function handleLockout() {
        LogoutUser().then(({errorMessage, success}) => {
            if(success) {
                toast.success("Abgemeldet.")
                const reloadTimeout = setTimeout(() => {
                    window.location.reload();
                    clearTimeout(reloadTimeout);
                }, 350);
            } else {
                toast.error(errorMessage)
            }
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="cursor-pointer">Abmelden</Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] text-center" align="end">
                <p>Bist du dir sicher?</p>
                <Button variant="destructive" className="mt-2 w-full cursor-pointer" onClick={() => handleLockout()}>Ja, abmelden.</Button>
            </PopoverContent>
        </Popover>
    )
}
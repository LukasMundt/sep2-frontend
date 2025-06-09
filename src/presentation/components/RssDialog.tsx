import Cookies from "universal-cookie";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "./ui/dialog";
import {Button} from "./ui/button";
import {Label} from "./ui/label";
import {Input} from "@/presentation/components/ui/input.tsx";
import {useEffect, useState} from "react";
import GetRssFeedUrl from "@/business-rules/get-rss-feed-url.ts";
import {toast} from "sonner";
import {Skeleton} from "./ui/skeleton";
import {Clipboard, ClipboardCheck} from "lucide-react";

export default function RssDialog() {
    const isLoggedIn = new Cookies().get('accessToken');

    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [link, setLink] = useState<string | undefined>(undefined);

    const [copied, setCopied] = useState<boolean>(false);

    function handleCopy() {
        if (link) {
            navigator.clipboard.writeText(link)
                .then(() => {
                    setCopied(true);
                    setTimeout(() => {
                        setOpen(false);
                        setCopied(false);
                    }, 1000);
                })
        }

    }

    useEffect(() => {
        if (open && isLoggedIn && !loading && !error && link === undefined) {
            setLoading(true);
            GetRssFeedUrl().then(result => {
                if (result.success) {
                    setError(false);
                    setLink(result.rssFeedUrl)
                } else {
                    setError(true);
                    setLink(undefined);
                    toast.error(result.errorMessage);
                }
            }).catch(() => {
                setError(true);
                setLink(undefined);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [open]);

    if (!isLoggedIn) {
        return <></>;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="cursor-pointer">RSS-Feed abonnieren</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>RSS-Feed-Link</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        {(error || !link || loading) && <Skeleton className="h-9"/>}
                        {link && !error && !loading && <Input
                            id="link"
                            defaultValue={link}
                            readOnly
                        />}
                    </div>
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button type="button" variant="secondary" className="cursor-pointer"
                            disabled={error || !link || loading} onClick={() => handleCopy()}>
                        {copied ?
                            <><ClipboardCheck/> Kopiert</> :
                            <><Clipboard/> Kopieren</>}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
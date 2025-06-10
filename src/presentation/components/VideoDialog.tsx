import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/presentation/components/ui/dialog.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {useState} from "react";
import {CircleX, Play} from "lucide-react";
import {Link} from "react-router-dom";

export default function VideoDialog({videoLink}: { videoLink: string }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer" size="icon"><Play/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="sr-only">Video vom Speedrun</DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <Video videoLink={videoLink}/>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function Video({videoLink}: { videoLink: string }) {
    let link = videoLink;

    if (/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/.test(link)) {
        const match = link.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (match) {
            link = `https://www.youtube.com/embed/${match[1]}?si=Uuba2zzi062ZGGiG`
        } else {
            link = "";
        }
    }

    else if (!link.startsWith("http")) {
        return <div className={"aspect-video w-full flex items-center justify-center bg-secondary rounded-md"}>
            <CircleX/>
        </div>;
    }

    else if (link.startsWith("https")) {
        return <Link to={link} target="_blank" rel="noopener noreferrer" className="w-full aspect-video">
            <div className={"flex items-center justify-center bg-secondary rounded-md"}>
                <Play/>
            </div>
        </Link>
    }

    return (
        <iframe className="aspect-video w-full"
                src={link}
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
        </iframe>
    );
}
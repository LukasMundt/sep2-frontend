import {useParams} from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup, SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/presentation/components/ui/select.tsx";
import {Button} from "@/presentation/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/presentation/components/ui/table.tsx";

export default function Game() {
    let params = useParams();

    const leaderboardEntries = [
        {rank: 1, gamer: "Hugo270", time: "1m 20s", date: new Date()},
        {rank: 2, gamer: "Jan_Boss", time: "1m 20s", date: new Date()},
        {rank: 3, gamer: "EmmaUnicorn", time: "1m 30s", date: new Date()},
        {rank: 4, gamer: "DarkShadow77", time: "1m 33s", date: new Date()},
        {rank: 5, gamer: "Timitom", time: "1m 40s", date: new Date()},
    ]

    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 text-left gap-[34px]">
            <div className="">
                <img src="https://se2-17.dev.lukas-mundt.de/games/minecraft.avif" alt="Minecraft"
                     className="max-w-[233px] mx-auto"/>
                <h2 className="text-center text-5xl font-semibold">Minecraft</h2>
                <Select>
                    <SelectTrigger className="w-full max-w-[233px] mx-auto mt-[34px]">
                        <SelectValue placeholder="Wähle eine Kategorie"/>
                    </SelectTrigger>
                    <SelectContent className="w-full max-w-[233px]">
                        <SelectGroup>
                            <SelectLabel>Kategorie</SelectLabel>
                            <SelectItem value="any-percent">Any%</SelectItem>
                            <SelectItem value="any-percent-glitchless">Any% Glitchless</SelectItem>
                            <SelectItem value="all-achievements">All Achievements</SelectItem>
                            <SelectItem value="all-advancements">All Advancements</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-semibold">Leaderboard</h3>
                    <Button variant="destructive">Run einreichen</Button>
                </div>
                <Table className="mt-[34px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[21px] font-semibold">#</TableHead>
                            <TableHead className="font-semibold">Spieler</TableHead>
                            <TableHead className="font-semibold">Zeit</TableHead>
                            <TableHead>Datum</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboardEntries.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">1</TableCell>
                                <TableCell>Hugo270</TableCell>
                                <TableCell>1m 20s</TableCell>
                                <TableCell>{entry.date.toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
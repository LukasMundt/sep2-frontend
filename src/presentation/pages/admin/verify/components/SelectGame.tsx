import {useEffect, useState} from "react";
import GetGames from "@/business-rules/get-games.ts";
import {components} from "@/data-domain/schema";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";
import {
    Select, SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/presentation/components/ui/select.tsx";

export default function SelectGame({onGameSelected}:{onGameSelected: (gameSlug: string) => void}){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean|undefined>(false);
    const [games, setGames] = useState<undefined|components["schemas"]["GameDto"][]>(undefined);

    useEffect(() => {
        if(!loading && !error && games === undefined){
            setLoading(true);
            GetGames().then(({data, error}) => {
                setGames(data)
                setError(error);
            }).catch(() => {
                setError(true);
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [])

    if(error || loading){
        return <Skeleton className="h-9"/>
    }

    return <Select onValueChange={onGameSelected}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Wähle ein Spiel"/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectLabel>Spiele</SelectLabel>
                {games?.map((game, index) => (
                    <SelectItem value={game.slug}
                                key={`${game.slug}-${index}`}>{game.name}</SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
}
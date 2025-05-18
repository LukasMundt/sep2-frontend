import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CategorySelection from "@/presentation/pages/game/components/CategorySelection.tsx";
import {components} from "@/data-domain/schema";
import Leaderboard from "@/presentation/pages/game/components/leaderboard/Leaderboard.tsx";
import GetGame from "@/business-rules/get-game.ts";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";

export default function Game() {
    const params = useParams();

    const [category, setCategory] = useState<components["schemas"]["Category"]["categoryId"] | undefined>(undefined);

    const [loading, setLoading] = useState(false);
    const [game, setGame] = useState<components["schemas"]["GameDto"] | undefined>(undefined);
    const [error, setError] = useState<undefined|boolean>(undefined);

    async function loadGame(): Promise<void> {
        const {data, error} = await GetGame(params.gameSlug??"");

        setGame(data);
        setError(error);
        setLoading(false);
    }

    useEffect(() => {
        if (game == undefined && error == undefined && !loading && params.gameSlug != undefined) {
            setLoading(true);
            loadGame();
        }
    })

    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 text-left gap-[34px]">
            <div className="">
                {loading||error?<Skeleton className="aspect-square max-w-[233px]"/>:<img src={game?.imageUrl} alt={params.gameSlug}
                     className="max-w-[233px] mx-auto"/>}
                {loading||error?<Skeleton className="h-9 mt-1 max-w-[233px]"/>:<h2 className="text-center text-5xl font-semibold">{game?.name}</h2>}
                <CategorySelection onSelection={setCategory} gameSlug={params.gameSlug} category={category}/>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between mb-[34px]">
                    <h3 className="text-3xl font-semibold">Leaderboard</h3>
                </div>
                <Leaderboard category={category} gameSlug={params.gameSlug}/>
            </div>
        </div>
    )
}
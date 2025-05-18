import {useParams} from "react-router-dom";
import {useState} from "react";
import CategorySelection from "@/presentation/pages/game/components/CategorySelection.tsx";
import {components} from "@/data-domain/schema";
import Leaderboard from "@/presentation/pages/game/components/leaderboard/Leaderboard.tsx";

export default function Game() {
    const params = useParams();

    const [category, setCategory] = useState<components["schemas"]["Category"]["categoryId"] | undefined>(undefined);

    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 text-left gap-[34px]">
            <div className="">
                <img src={`/games/${params.gameSlug}.avif`} alt={params.gameSlug}
                     className="max-w-[233px] mx-auto"/>
                <h2 className="text-center text-5xl font-semibold">Minecraft</h2>
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
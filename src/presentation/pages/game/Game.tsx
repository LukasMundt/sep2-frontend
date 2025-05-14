import {useParams} from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectGroup, SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/presentation/components/ui/select.tsx";
import {Category, instanceOfLeaderboard, Leaderboard} from "@/data-domain/models";
import {useEffect, useState} from "react";
import {ErrorModel} from "@/data-domain/clients/error.model.ts";
import GetLeaderboardFromGameAndCategory from "@/business-rules/get-leaderboard-from-game-and-category.ts";
import LeaderboardTable from "@/presentation/pages/game/components/LeaderboardTable.tsx";
import {capitalize} from "@/presentation/lib/utils.ts";
import LeaderboardError from "@/presentation/pages/game/components/LeaderboardError.tsx";
import {Loader} from "lucide-react";

const categories: Category[] = [
    "ANY_PERCENT",
    "ANY_PERCENT_GLITCHLESS",
    "ALL_ARCHIEVMENTS",
    "ALL_ADVANCEMENTS"
];

export default function Game() {
    let params = useParams();

    const [loading, setLoading] = useState(false);
    const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(null);
    const [error, setError] = useState<ErrorModel | null>(null);
    const [category, setCategory] = useState<Category | undefined>(categories[0]);

    useEffect(() => {
        if (leaderboard == null && error == null && !loading) {
            setLoading(true);
            loadLeaderboards();
        }
    }, [category, leaderboard, error]);

    useEffect(() => {
        setLeaderboard(null);
        setError(null);
    }, [category]);

    console.log(leaderboard, category, error, loading);

    async function loadLeaderboards(): Promise<void> {
        const result = await GetLeaderboardFromGameAndCategory(params.gameSlug ? capitalize(params.gameSlug) : params.gameSlug, category);
        if (instanceOfLeaderboard(result)) {
            setLeaderboard(result)
            setError(null);
        } else {
            setError(result);
            setLeaderboard(null);
        }
        setLoading(false);
    }


    return (
        <div className="grid md:grid-cols-3 lg:grid-cols-4 text-left gap-[34px]">
            <div className="">
                <img src={`/games/${params.gameSlug}.avif`} alt={params.gameSlug}
                     className="max-w-[233px] mx-auto"/>
                <h2 className="text-center text-5xl font-semibold">Minecraft</h2>
                <Select value={category} onValueChange={(categorySelected: Category) => setCategory(categorySelected)}>
                    <SelectTrigger className="w-full max-w-[233px] mx-auto mt-[34px]">
                        <SelectValue placeholder="Wähle eine Kategorie"/>
                    </SelectTrigger>
                    <SelectContent className="w-full max-w-[233px]">
                        <SelectGroup>
                            <SelectLabel>Kategorie</SelectLabel>
                            {categories.map((category, index) => (
                                <SelectItem key={`${category}-${index}`} value={category}>{category}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between mb-[34px]">
                    <h3 className="text-3xl font-semibold">Leaderboard</h3>
                </div>
                {loading && <div className="w-full h-[100px] flex items-center justify-center"><Loader className="animate-spin"/></div> }
                {leaderboard != null && !loading && leaderboard.runs &&
                    <LeaderboardTable runs={leaderboard.runs}/>
                }
                {error != null && !loading &&
                    <LeaderboardError category={category}/>
                }
            </div>
        </div>
    )
}
import SelectGame from "@/presentation/pages/admin/verify/components/SelectGame.tsx";
import SelectCategory from "@/presentation/pages/admin/verify/components/SelectCategory.tsx";
import {useState} from "react";
import RunsTable from "@/presentation/pages/admin/verify/components/RunsTable.tsx";
import {useSearchParams} from "react-router-dom";

export default function Verify() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [game, setGame] = useState<undefined | string>(searchParams.get("game") ?? undefined);
    const [category, setCategory] = useState<undefined | string>(searchParams.has("category") && searchParams.has("game") ? searchParams.get("category") ?? undefined : undefined);

    return <>
        <div className="grid sm:grid-cols-2 gap-2 mb-3">
            <SelectGame gameSlug={game} onGameSelected={(game) => {
                setGame(game)
                setSearchParams((prev) => {
                    prev.set("game", game);
                    return prev;
                })
            }}/>
            <SelectCategory gameSlug={game} category={category}
                            onCategorySelected={(category) => {
                                setCategory(category)
                                setSearchParams((prev) => {
                                    prev.set("category", category);
                                    return prev;
                                })
                            }}/>
        </div>
        <RunsTable gameSlug={game} category={category}/>
    </>
}
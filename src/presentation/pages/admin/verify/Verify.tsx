import SelectGame from "@/presentation/pages/admin/verify/components/SelectGame.tsx";
import SelectCategory from "@/presentation/pages/admin/verify/components/SelectCategory.tsx";
import {useState} from "react";
import RunsTable from "@/presentation/pages/admin/verify/components/RunsTable.tsx";

export default function Verify(){
    const [game, setGame] = useState<undefined|string>(undefined);
    const [category, setCategory] = useState<undefined|string>(undefined);

    return <>
        <div className="grid sm:grid-cols-2 gap-2 mb-3">
            <SelectGame onGameSelected={(game) => setGame(game)}/>
            <SelectCategory gameSlug={game} onCategorySelected={(category) => setCategory(category)}/>
        </div>
        <RunsTable gameSlug={game} category={category}/>
    </>
}
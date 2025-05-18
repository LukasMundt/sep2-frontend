import {Loader} from "lucide-react";
import {useEffect, useState} from "react";
import {components} from "@/data-domain/schema";
import GetLeaderboardFromGameAndCategory from "@/business-rules/get-leaderboard-from-game-and-category.ts";
import LeaderboardError from "@/presentation/pages/game/components/leaderboard/LeaderboardError.tsx";
import LeaderboardTable from "@/presentation/pages/game/components/leaderboard/LeaderboardTable.tsx";

export default function Leaderboard({category, gameSlug}: {
    category: components["schemas"]["Category"]["categoryId"] | undefined,
    gameSlug: components["schemas"]["GameDto"]["slug"] | undefined,
}) {
    const [loading, setLoading] = useState(false);
    const [leaderboard, setLeaderboard] = useState<components["schemas"]["RunDto"][] | undefined>(undefined);
    const [error, setError] = useState<undefined>(undefined);

    useEffect(() => {
        if (leaderboard == undefined && category != undefined && error == undefined && !loading) {
            setLoading(true);
            loadLeaderboards();
        }
    }, [category, leaderboard, error]);

    useEffect(() => {
        setLeaderboard(undefined);
        setError(undefined);
    }, [category]);

    async function loadLeaderboards(): Promise<void> {
        const {data, error} = await GetLeaderboardFromGameAndCategory(gameSlug ?? "", category ?? "");

        setLeaderboard(data);
        setError(error);
        setLoading(false);
    }

    if (!loading && leaderboard) {
        return <LeaderboardTable runs={leaderboard}/>
    } else if (loading) {
        return <div className="w-full h-[100px] flex items-center justify-center"><Loader
            className="animate-spin"/></div>
    } else if (category == undefined) {
        return <LeaderboardError title="Kategorie auswählen" message={<p>Bitte wähle eine Kategorie aus.</p>}/>
    } else {
        return <LeaderboardError title="Fehler beim Laden"
                                 message={<p>Bei laden des Leaderboards für die Kategorie <b>{category ?? "?"}</b> ist
                                     leider ein Fehler aufgetreten.</p>}/>
    }
}
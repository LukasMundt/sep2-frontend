import {useEffect, useState} from "react";
import {components} from "@/data-domain/schema";
import GetLeaderboardFromGameAndCategory from "@/business-rules/get-leaderboard-from-game-and-category.ts";
import LeaderboardError from "@/presentation/pages/game/components/leaderboard/LeaderboardError.tsx";
import LeaderboardTable from "@/presentation/pages/game/components/leaderboard/LeaderboardTable.tsx";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";
import {toast} from "sonner";

export default function Leaderboard({category, gameSlug}: {
    readonly category: components["schemas"]["Category"]["categoryId"] | undefined,
    readonly gameSlug: components["schemas"]["GameDto"]["slug"] | undefined,
}) {
    const [loading, setLoading] = useState(false);
    const [leaderboard, setLeaderboard] = useState<components["schemas"]["RunDto"][] | undefined>(undefined);
    const [error, setError] = useState<undefined | boolean>(undefined);

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
        if (error != undefined) {
            toast.error("Es ist ein Fehler beim Laden des Leaderboards aufgetreten.")
        }
    }

    if (!loading && leaderboard) {
        return <LeaderboardTable runs={leaderboard}/>
    } else if (loading) {
        return <Skeleton className="h-[100px] w-full"/>
    } else if (category == undefined) {
        return <LeaderboardError title="Kategorie auswählen" message={<p>Bitte wähle eine Kategorie aus.</p>}/>
    } else {
        return <LeaderboardError title="Fehler beim Laden"
                                 message={<p>Beim Laden des Leaderboards für die Kategorie <b>{category ?? "?"}</b> ist
                                     leider ein Fehler aufgetreten.</p>}/>
    }
}
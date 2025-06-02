import {useEffect, useState} from "react";
import {components} from "@/data-domain/schema";
import GetGames from "@/business-rules/get-games.ts";
import {Card} from "@/presentation/components/ui/card.tsx";
import {MoveUpRight} from "lucide-react";
import {Skeleton} from "@/presentation/components/ui/skeleton.tsx";
import {toast} from "sonner";
import {Link} from "react-router-dom";

export function Games() {
    const [games, setGames] = useState<components["schemas"]["GameDto"][] | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<undefined | boolean>(undefined);

    useEffect(() => {
        async function loadGames(): Promise<void> {
            const {data, error} = await GetGames();

            setGames(data);
            setError(error);
            setLoading(false);
            if (error != undefined) {
                toast.error("Es ist ein Fehler beim Laden der Spiele aufgetreten.")
            }
        }

        if (!loading && games == undefined && error == undefined) {
            loadGames();
        }
    }, [])

    if (loading || error) {
        return <div
            className="grid group/list grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[21px] md:gap-[13px] lg:gap-[21px]">
            {Array.from({length: 20}).map((_, index) => (
                <Skeleton key={index} className="aspect-square"/>
            ))}
        </div>
    }

    return (
        <div
            className="grid group/list grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-[21px] md:gap-[13px] lg:gap-[21px]">
            {
                games != undefined && games.map((game: components["schemas"]["GameDto"], index) => (
                    <div key={index} className="relative group/item">
                        <Link to={`/games/${game.slug}`}>
                            <img src={game.imageUrl} alt={`Image for the game${game.name}`}
                                 className="group-has-[:hover]/list:opacity-50 transition-opacity duration-300 ease-in-out rounded-md"/>
                            <Card
                                className="absolute -top-[13px] -left-[13px] -right-[13px] p-[13px] hidden group-hover/item:block z-40 shadow-2xl">
                                <img src={game.imageUrl} alt={`Image for the game${game.name}`} className="rounded-md"/>
                                <div className="flex gap-[5px] mt-[8px] items-center group/game-name">
                        <span
                            className="text-lg group-hover/game-name:underline underline-offset-[3px]">{game.name}</span>
                                    <MoveUpRight className="size-[13px]"/>
                                </div>
                            </Card>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}

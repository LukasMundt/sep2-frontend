import {Category, Leaderboard} from "@/data-domain";
import {ErrorModel} from "@/data-domain/clients/error.model.ts";
import GetLeaderboardGameCategoryClient
    from "@/data-domain/clients/get-leaderboard-game-category/get-leaderboard-game-category.client.ts";

export default async function GetLeaderboardFromGameAndCategory(
    game: string|undefined,
    category: Category|undefined,
): Promise<ErrorModel | Leaderboard> {
    if(game == undefined)
        return {message: "game can't be undefined"}
    if(category == undefined)
        return {message: "category can't be undefined"}

    const client = new GetLeaderboardGameCategoryClient()
    return await client.fetch(game, category);

}
import {
    GetLeaderboardGameCategoryResponse
} from "@/data-domain/clients/get-leaderboard-game-category/get-leaderboard-game-category.response.ts";
import {Category, LeaderboardFromJSONTyped} from "@/data-domain";
import {ErrorModel} from "@/data-domain/clients/error.model.ts";

export default class GetLeaderboardGameCategoryClient {
    async fetch (gameSlug: string, category: Category) : Promise<GetLeaderboardGameCategoryResponse|ErrorModel> {
        try {
            const response = await fetch(`/api/leaderboard/${gameSlug}/${category}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

            if(!response.ok) {
                return {
                    message: "Failed to fetch leaderboard",
                    context: response.json()
                }
            }

            const data : GetLeaderboardGameCategoryResponse = LeaderboardFromJSONTyped(await response.json(), true);
            return data;
        } catch (error) {
            return {
                message: "Failed to fetch leaderboard",
                context: error
            }
        }
    }
}
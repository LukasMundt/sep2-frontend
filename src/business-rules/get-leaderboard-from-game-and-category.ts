import createClient from "openapi-fetch";
import type {paths} from "@/data-domain/schema";

export default async function GetLeaderboardFromGameAndCategory(
    gameSlug: paths["/rest/api/games/{gameSlug}/{categoryId}/leaderboard"]["get"]["parameters"]["path"]["gameSlug"],
    category: paths["/rest/api/games/{gameSlug}/{categoryId}/leaderboard"]["get"]["parameters"]["path"]["categoryId"] ,
) {
    const client = createClient<paths>()
    const {data, error} = await client.GET(
        "/rest/api/games/{gameSlug}/{categoryId}/leaderboard", {
            params: {
                path: {
                    gameSlug: gameSlug,
                    categoryId: category
                }
            }
        }
    );

    return {
        data: data,
        error: error
    };
}
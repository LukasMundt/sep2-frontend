import createClient from "openapi-fetch";
import type {paths} from "@/data-domain/schema";

export default async function GetCategoriesFromGame(
    gameSlug: paths["/rest/api/games/{gameSlug}/categories"]["get"]["parameters"]["path"]["gameSlug"],
) {
    const client = createClient<paths>()
    const {data, error} = await client.GET(
        "/rest/api/games/{gameSlug}/categories", {
            params: {
                path: {
                    gameSlug: gameSlug,
                }
            }
        }
    );

    return {
        data: data,
        error: error
    };
}
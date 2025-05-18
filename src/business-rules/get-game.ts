import createClient from "openapi-fetch";
import type {paths} from "@/data-domain/schema";

export default async function GetGame(
    gameSlug: paths["/rest/api/games/{gameSlug}"]["get"]["parameters"]["path"]["gameSlug"],
): Promise<{
    data: paths["/rest/api/games/{gameSlug}"]["get"]["responses"]["200"]["content"]["application/json"] | undefined,
    error: undefined|boolean
}> {
    const client = createClient<paths>()
    const {data, error} = await client.GET(
        "/rest/api/games/{gameSlug}", {
            params: {
                path: {
                    gameSlug: gameSlug,
                }
            }
        }
    );

    return {
        data: data,
        error: data==undefined?true:error
    };
}
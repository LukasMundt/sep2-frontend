import createClient from "openapi-fetch";
import type {paths} from "@/data-domain/schema";

export default async function GetGames(
): Promise<{
    data: paths["/rest/api/games/all"]["get"]["responses"]["200"]["content"]["application/json"] | undefined,
    error: undefined | boolean
}> {
    const client = createClient<paths>()
    const {data, error} = await client.GET(
        "/rest/api/games/all"
    );

    return {
        data: data,
        error: data == undefined ? true : error
    };
}
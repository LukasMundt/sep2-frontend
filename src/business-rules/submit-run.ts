import createClient from "openapi-fetch";
import type {components, paths} from "@/data-domain/schema";
import Cookies from "universal-cookie";

export default async function submitRun(
    gameSlug: components["schemas"]["GameDto"]["slug"],
    categoryId: components["schemas"]["Category"]["categoryId"],
    data: paths["/rest/api/games/{gameSlug}/{categoryId}/runs"]["post"]["requestBody"]["content"]["application/json"],
):Promise <{success: boolean, errorMessage?: string, status: number}> {
    const client = createClient<paths>()
    return client.POST(
        "/rest/api/games/{gameSlug}/{categoryId}/runs",
        {
            params: {
                path: {
                    gameSlug: gameSlug,
                    categoryId: categoryId
                }
            },
            body: data,
            headers: {
                "Authorization": `Bearer ${new Cookies().get("accessToken")}`
            }
        }
    ).then(res => {
        if (!res.response.ok) {
            return {
                success: false,
                errorMessage: "Es ist ein Fehler aufgetreten.",
                status: res.response.status
            }
        }
        return {
            success: true,
            status: res.response.status
        }
    }).catch(err => {
        return {
            success: false,
            errorMessage: err.message,
            status: err.response.status
        }
    });
}
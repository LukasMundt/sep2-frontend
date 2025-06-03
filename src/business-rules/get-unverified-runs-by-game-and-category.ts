import Cookies from "universal-cookie";
import createClient from "openapi-fetch";
import {components, paths} from "@/data-domain/schema";

interface GetUnverifiedRunsByGameAndCategoryResult {
    success: boolean,
    data?: paths["/rest/api/reviews/unreviewed/{gameSlug}/{categoryId}"]["get"]["responses"]["200"]["content"]["application/json"]
    errorMessage?: string
}

export default async function GetUnverifiedRunsByGameAndCategory(
    gameSlug: components["schemas"]["GameDto"]["slug"],
    categoryId: components["schemas"]["Category"]["categoryId"]
): Promise<GetUnverifiedRunsByGameAndCategoryResult> {
    const token = new Cookies().get("accessToken");
    const client = createClient<paths>();
    return client.GET("/rest/api/reviews/unreviewed/{gameSlug}/{categoryId}", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            path: {
                gameSlug: gameSlug,
                categoryId: categoryId
            }
        }
    }).then(res => {
            if (!res.response.ok) {
                return {
                    success: false,
                    errorMessage: "Es ist ein Fehler aufgetreten."
                }
            }
            return {
                success: true,
                data: res.data
            }
        }
    ).catch(() => {
        return {
            success: false,
            errorMessage: "Es ist ein Fehler aufgetreten."
        }
    })
}
import {components, paths} from "@/data-domain/schema";
import createClient from "openapi-fetch";
import Cookies from "universal-cookie";


export default async function DeclineUnverifiedRun(
    uuid: components["schemas"]["RunReview"]["run"]["uuid"]
): Promise<{ success: boolean, errorMessage?: string }> {
    const token = new Cookies().get("accessToken");
    const client = createClient<paths>();
    return client.DELETE(
        "/rest/api/reviews/unreviewed/{uuid}", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                path: {
                    uuid: uuid,
                }
            }
        }
    ).then(res => {
        return {success: res.response.ok, errorMessage: res.response.ok ? undefined : "Es ist ein Fehler aufgetreten."};
    }).catch(() => {
        return {success: false, errorMessage: "Es ist ein Fehler aufgetreten."};
    })
}
import {components, paths} from "@/data-domain/schema";
import createClient from "openapi-fetch";


export default async function DeclineUnverifiedRun(
    uuid: components["schemas"]["RunReview"]["uuid"]
): Promise<{ success: boolean, errorMessage?: string }> {
    const client = createClient<paths>();
    return client.DELETE(
        "/rest/api/reviews/unreviewed/{uuid}", {
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
import {components, paths} from "@/data-domain/schema";
import createClient from "openapi-fetch";
import Cookies from "universal-cookie";

interface VerifyRunResult {
    success: boolean
    errorMessage?: string
}

export default async function VerifyRun(runUUID: components["schemas"]["RunReview"]["uuid"]): Promise<VerifyRunResult> {
    const token = new Cookies().get("accessToken");
    const client = createClient<paths>();
    console.log(runUUID);
    return client.PATCH("/rest/api/reviews/unreviewed/{uuid}", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            path: {
                uuid: runUUID,
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
            success: true
        }
    }).catch(() => {
        return {
            success: false,
            errorMessage: "Es ist ein Fehler aufgetreten."
        }
    })
}
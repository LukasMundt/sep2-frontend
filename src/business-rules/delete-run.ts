import {components, paths} from "@/data-domain/schema";
import createClient from "openapi-fetch";
import Cookies from "universal-cookie";

export interface DeleteRunResult {
    success: boolean,
    errorMessage?: string
}

export default async function DeleteRun(runUUID: components["schemas"]["RunDto"]["uuid"]): Promise<DeleteRunResult> {
    const token = new Cookies().get("accessToken")
    const client = createClient<paths>();
    return client.DELETE("/rest/api/runs/{uuid}", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            path: {
                uuid: runUUID,
            }
        },
    }).then(res => {
        return {
            success: res.response.ok,
            errorMessage: res.response.ok ? undefined : "Es ist ein Fehler aufgetreten."
        }
    }).catch(() => {
        return {
            success: false,
            errorMessage: "Es ist ein Fehler aufgetreten."
        }
    })
}
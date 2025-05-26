import type {components, paths} from "@/data-domain/schema";
import createClient from "openapi-fetch";
import Cookies from "universal-cookie";

export default async function LoginUser(
    loginCredentials: components["schemas"]["LoginCredentials"],
): Promise<{
    data?: paths["/rest/auth/login"]["post"]["responses"]["200"]["content"]["application/json"] | string,
    statusCode?: number,
    errorMessage: string | undefined,
    success: boolean
}> {
    const client = createClient<paths>()

    return client.POST(
        "/rest/auth/login", {
            body: loginCredentials,
        })
        .then(async (res) => {
            let errorMessage: string | undefined;
            if(res.response.ok){
                const cookie = new Cookies(null, {path: '/'});
                cookie.set("accessToken", res.data?.accessToken, {
                    path: '/',
                    maxAge: res.data?.expiresIn,
                    secure: true,
                    sameSite: "strict"
                });
            } else if(res.response.status == 401) {
                errorMessage = "Die Anmeldedaten sind nicht korrekt."
            } else if(res.response.status == 404 || res.response.status == 500) {
                errorMessage = "Ein Fehler ist aufgetreten."
            } else {
                errorMessage = undefined;
            }
            return {
                data: res.data,
                statusCode: res.response.status,
                errorMessage: errorMessage,
                success: res.response.status == 200
            };
        })
        .catch(() => {
            return {
                data: undefined,
                errorMessage: "Ein Fehler ist aufgetreten.",
                statusCode: undefined,
                success: false,
            }
        });
}
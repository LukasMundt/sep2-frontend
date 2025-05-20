import type {components, paths} from "@/data-domain/schema";
import createClient from "openapi-fetch";
import Cookies from "universal-cookie";

export default async function LoginUser(
    loginCredentials: components["schemas"]["LoginCredentials"],
): Promise<{
    data?: paths["/rest/auth/login"]["post"]["responses"]["200"]["content"]["application/json"],
    statusCode?: number,
    errorMessage: string | undefined,
    success: boolean
}> {
    const client = createClient<paths>()
    try {
        const {data, response} = await client.POST(
            "/rest/auth/login", {
                body: loginCredentials,
            }
        );
        let errorMessage: string | undefined;
        switch (response.status) {
            case 401:
                errorMessage = "Die Anmeldedaten sind nicht korrekt."
                break;
            case 404:
            case 500:
                errorMessage = "Ein Fehler ist aufgetreten."
                break;
            default:
                errorMessage = undefined;
        }
        if (response.ok) {
            const cookie = new Cookies(null, {path: '/'});
            cookie.set("accessToken", data?.accessToken, {
                path: '/',
                maxAge: data?.expiresIn,
                secure: true,
                httpOnly: true,
                sameSite: "strict"
            });
        }
        return {
            data: data,
            statusCode: response.status,
            errorMessage: errorMessage,
            success: response.status == 200
        };
    } catch {
        return {
            data: undefined,
            errorMessage: "Ein Fehler ist aufgetreten.",
            statusCode: undefined,
            success: false,
        }
    }

}
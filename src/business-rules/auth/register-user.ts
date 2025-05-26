import type {components, paths} from "@/data-domain/schema";
import createClient from "openapi-fetch";

export default async function RegisterUser(
    registerCredentials: components["schemas"]["RegisterCredentials"],
): Promise<{ success: boolean, errorMessage?: string }> {
    const client = createClient<paths>()
    return client.POST(
        "/rest/auth/register", {
            body: registerCredentials,
        })
        .then((res) => {
            if (res.response.status == 409) {
                return {
                    success: false,
                    errorMessage: "Die Email-Adresse oder der Username werden bereits verwendet."
                }
            } else if (!res.response.ok) {
                return {
                    success: false,
                    errorMessage: "Account konnte nicht erstellt werden."
                }
            }
            return {
                success: true,
            }
        })
        .catch(() => {
            return {
                success: false,
                errorMessage: "Account konnte nicht erstellt werden."
            }
        });
}
import type {components, paths} from "@/data-domain/schema";
import createClient from "openapi-fetch";

export default async function RegisterUser(
    registerCredentials: components["schemas"]["RegisterCredentials"],
): Promise<{
    success: boolean
}> {
    const client = createClient<paths>()
    try {
        await client.POST(
            "/rest/auth/register", {
                body: registerCredentials,
            }
        );
    } catch {
        return {
            success: false,
        }
    }
    return {
        success: true,
    };
}
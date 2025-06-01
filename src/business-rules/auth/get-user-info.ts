import Cookies from "universal-cookie";
import createClient from "openapi-fetch";
import {paths} from "@/data-domain/schema";

interface GetUserInfoResult {
    success: boolean;
    data?: paths["/rest/auth"]["get"]["responses"]["200"]["content"]["application/json"]
}

export default function getUserInfo(): Promise<GetUserInfoResult> {
    const token = new Cookies().get("accessToken");
    const client = createClient<paths>();
    return client.GET("/rest/auth", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        if (!res.response.ok) {
            return {
                success: false,
            }
        }
        return {
            success: true,
            data: res.data
        }
    }).catch(() => {
        return {
            success: false,
        }
    })
}
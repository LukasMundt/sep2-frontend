import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import Cookies from "universal-cookie";
import getUserInfo from "@/business-rules/auth/get-user-info.ts";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function capitalize(str: string): string {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function isAuthenticatedSimple() {
    // achtung: checkt nur, ob access token existiert. Müsste eigentlich reichen, weil Daten ja eh nur geladen werden, wenn der access token auch funktioniert
    return new Cookies().get("accessToken") != undefined;
}

export async function isAdmin() {
    const token = new Cookies().get("accessToken");
    if (!token) {
        return false;
    }
    return getUserInfo()
        .then((userInfoResult) => {
            return userInfoResult.success && (userInfoResult.data?.find((authority) => authority == "ADMIN") !== undefined);
        }).catch(() => {
            return false;
        })
}
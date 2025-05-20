import Cookies from "universal-cookie";

export default async function LogoutUser(): Promise<{
    errorMessage: string | undefined,
    success: boolean
}> {
    try {
        new Cookies().remove("accessToken", {path: '/'});

        return {
            errorMessage: undefined,
            success: true
        };
    } catch {
        return {
            errorMessage: "Ein Fehler ist aufgetreten.",
            success: false,
        }
    }

}
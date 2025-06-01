import {useEffect, useState} from "react";
import {isAdmin as isUserAdmin} from "@/presentation/lib/utils.ts";

export function useIsAdmin() {
    const [isAdmin, setIsAdmin] = useState<boolean|undefined>(undefined);

    useEffect(() => {
        isUserAdmin().then((isAdmin) => {
            setIsAdmin(isAdmin);
        }).catch(() => {
            setIsAdmin(false);
        })
    })

    return isAdmin;
}
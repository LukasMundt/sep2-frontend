import {useIsAdmin} from "@/presentation/hooks/is-admin.ts";
import {Navigate, Outlet} from "react-router-dom";
import {Loader} from "lucide-react";

export default function AdminWrapper() {
    const isAdmin = useIsAdmin()

    if(isAdmin === false){
        return <Navigate to={"/forbidden"} />
    }
    if(isAdmin == undefined){
        return <div className="absolute -z-10 left-0 items-center top-0 flex justify-center w-full h-dvh">
            <div className="flex flex-col items-center text-center space-y-4">
                <Loader className="h-10 w-10 text-primary animate-spin" />
                <div>
                    <h2 className="text-lg font-semibold">Berechtigungen werden geprüft</h2>
                    <p className="text-muted-foreground text-sm">
                        Einen Moment bitte, wir überprüfen deinen Zugriff.
                    </p>
                </div>
            </div>
        </div>
    }
    return <Outlet />
}
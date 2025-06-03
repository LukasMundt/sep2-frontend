import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Home from './pages/home/Home.tsx'
import {BrowserRouter, Routes, Route, Navigate, useLocation, Outlet} from "react-router-dom";
import RootLayout from "@/presentation/pages/RootLayout.tsx";
import NoPage from "./pages/no-page/NoPage.tsx";
import Game from "@/presentation/pages/game/Game.tsx";
import Register from "@/presentation/pages/auth/Register.tsx";
import Login from "@/presentation/pages/auth/Login.tsx";
import {isAuthenticatedSimple} from "@/presentation/lib/utils.ts";
import UploadSpeedrun from "@/presentation/pages/upload-speedrun/UploadSpeedrun.tsx";
import Forbidden from "@/presentation/pages/admin/Forbidden.tsx";
import Verify from "@/presentation/pages/admin/verify/Verify.tsx";
import AdminWrapper from "@/presentation/pages/admin/AdminWrapper.tsx";

export default function App() {
    return (
        <StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                           element={
                               <RootLayout/>
                           }
                    >
                        <Route index element={<Home/>}/>
                        <Route path="/games/:gameSlug" element={<Game/>}/>
                        {/* Auth */}
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>

                        <Route path="/" element={<PrivateWrapper/>}>
                            {/* Private pages */}
                            <Route path="/upload-speedrun" element={<UploadSpeedrun/>}/>

                            {/* Admin pages */}
                            <Route path="/" element={<AdminWrapper/>}>
                                <Route path="/runs/unverified" element={<Verify/>}/>
                            </Route>
                        </Route>

                        <Route path="/forbidden" element={<Forbidden/>}/>
                        {/* Fallback */}
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </StrictMode>
    );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);

const PrivateWrapper = () => {
    const location = useLocation();
    // achtung: checkt nur, ob access token existiert. Müsste eigentlich reichen, weil Daten ja eh nur geladen werden, wenn der access token auch funktioniert
    const isAuthenticated = isAuthenticatedSimple();
    return isAuthenticated ? <Outlet/> :
        <Navigate to={{pathname: "/login", search: '?returnUrl=' + encodeURIComponent(location.pathname)}}/>;
};
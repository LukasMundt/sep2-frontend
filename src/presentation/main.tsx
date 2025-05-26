import {ReactNode, StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Home from './pages/home/Home.tsx'
import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import RootLayout from "@/presentation/pages/RootLayout.tsx";
import NoPage from "./pages/no-page/NoPage.tsx";
import Game from "@/presentation/pages/game/Game.tsx";
import Register from "@/presentation/pages/auth/Register.tsx";
import Login from "@/presentation/pages/auth/Login.tsx";
import {isAuthenticatedSimple} from "@/presentation/lib/utils.ts";
import UploadSpeedrun from "@/presentation/pages/upload-speedrun/UploadSpeedrun.tsx";

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
                        {/* Private pages */}
                        <Route path="/upload-speedrun" element={
                            <PrivateWrapper><UploadSpeedrun/></PrivateWrapper>
                        }/>

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

const PrivateWrapper = ({children}: { children: ReactNode }) => {
    const location = useLocation();
    // achtung: checkt nur, ob access token existiert. Müsste eigentlich reichen, weil Daten ja eh nur geladen werden, wenn der access token auch funktioniert
    const isAuthenticated = isAuthenticatedSimple();
    return isAuthenticated ? children :
        <Navigate to={{pathname: "/login", search: '?returnUrl=' + encodeURIComponent(location.pathname)}}/>;
};
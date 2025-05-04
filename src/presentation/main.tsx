import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Home from './pages/Home.tsx'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NoPage from "./pages/NoPage.tsx";
import Game from "@/presentation/pages/Game.tsx";

export default function App() {
    return (
        <StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                        // element={<Layout/>}
                    >
                        <Route index element={<Home/>}/>
                        <Route path="/games/:gameSlug" element={<Game/>}/>
                        <Route path="*" element={<NoPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </StrictMode>
    );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App/>);

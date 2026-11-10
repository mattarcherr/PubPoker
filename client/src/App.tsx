import './App.css'
import Landing from "./pages/Landing.tsx";
import {useState} from "react";

function App() {
    const [screen, setScreen] = useState<string>('landing')
    
    switch (screen) {
        case 'landing': return <Landing setScreen={setScreen} />
        case 'table': return (
            <div>
                <h1>Table!!!</h1>
                <button onClick={() => setScreen('landing')}>Landing</button>
            </div>
        )
    }
}

export default App

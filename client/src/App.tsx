import './App.css'
import {useEffect, useState} from "react";
import LandingPage from "./pages/LandingPage.tsx";
import {connection} from "./signalR.ts";

// Colours for later
// #1B4D3E - Brunswick Green
// #601010 - Rustic Maroon Red
// #09663A - Citrus green
// #1A1A1A - Dark Charcoal
// #4A4A4A - Deep Grey
// #102A45 - Rurikon Blue
// #D4AF37 - Metallic Gold
// #1B4D3E - Brunswick Green

type Menu = 'landing' | 'create' | 'join';
type GameState = 'lobby' | 'table' | 'settle-up';

function useGame() {
    const [game, setGame] = useState<GameState | null>(null)

    useEffect(() => {
        connection.on('GameUpdated', setGame)
        return () => connection.off('GameUpdated', setGame)
    }, [])
    
    return {
        game,
        createGame: (name: string) => connection.invoke('CreateGame', name),
        joinGame: (code: string, name: string) => connection.invoke('JoinGame', code, name),
    }
}

function App() {
    const {game, createGame, joinGame } = useGame()
    const [menu, setMenu] = useState<Menu>('landing')
    const [gameCode, setGameCode] = useState('')
    
    useEffect(() => {
        connection.on("ReceiveMessage", (msg) => {
            console.log(msg)
        })
        return () => connection.off("ReceiveMessage", (msg) => {
            console.log(msg)
        })
    })
    
    
    // If table is null then pages are manged by the menu state.
    // Otherwise, it's manged server side with SignalIR
    if (game)
        switch (game)
        {
            case 'lobby': return <></>
            case 'table': return <></>
            case 'settle-up': return <></>
        }
    
    switch (menu) {
        case 'landing': return (
            <LandingPage 
                onCreate={() => setMenu('create')} 
                onJoin={() => setMenu('join')} 
            />
        )
        case 'create': return (
            <>
                <h1>Create Game Menu</h1>
                <button onClick={() => createGame("1A2B")}>Create Game</button>
                <button onClick={() => setMenu('landing')}>Landing</button>
                <button onClick={() => connection.invoke("GroupMessage", "1A2B", "Test123")} >Group Message</button>
            </>
        )
        case 'join': return (
            <>
                <h1>Join Game Menu</h1>
                <input value={gameCode} onChange={(e) => setGameCode(e.target.value)} />
                <button onClick={() => joinGame(gameCode, "Matt")}>Join Game</button>
                <button onClick={() => setMenu('landing')}>Landing</button>
            </>
        )
    }
}

export default App

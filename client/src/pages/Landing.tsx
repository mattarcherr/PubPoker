import type { Dispatch, SetStateAction } from 'react'

function Landing({setScreen}: { setScreen: Dispatch<SetStateAction<string>> }) {
    return (
        <div>
            <button onClick={() => setScreen('table')}>Start Game</button>
            <button>Join Game</button>
        </div>
    )
}

export default Landing;
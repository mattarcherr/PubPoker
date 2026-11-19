type Props = {
    onCreate: () => void
    onJoin: () => void
}

function LandingPage({onCreate, onJoin}: Props ) {
    return (
        <div>
            <button onClick={onCreate}>Create Table</button>
            <button onClick={onJoin}>Join Table</button>
        </div>
    )
}

export default LandingPage;
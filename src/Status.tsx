interface StatusProps {
    status: "waiting" | "playing" | "won" | "lost" | "tie";
}

const Status: React.FC<StatusProps> = ({ status }) => {
    if (status === 'playing') return null;

    return (
        <div className="mt-3 font-bold m-auto">
            {status === "won" && <p>🏆 You won! 🏆</p>}
            {status === "lost" && <p>❌ You lost! ❌</p>}
            {status === "tie" && <p>🫱🏻‍🫲🏻 It's a tie! 🫱🏻‍🫲🏻</p>}
        </div>
    )
}

export default Status
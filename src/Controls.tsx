import { useState } from "react";
import Button from "./Button";

interface ControlsProps {
    onHit: () => void;
    onStand: () => void;
    onBet: (amount: number) => void;
    balance: number;
    hasStood: boolean;
    playerValue: number;
    onNewGame: () => void;
    onNextRound: () => void;
    canPlayerAct: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onHit, onStand, onBet , balance, hasStood, playerValue, onNewGame, onNextRound, canPlayerAct
}) => {
    const [betAmount, setBetAmount] = useState(10);

    const handleBet = () => {
        if (betAmount > 0 && betAmount <= balance) {
            onBet(betAmount)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto space-y-1">
            <div className="grid grid-cols-3 gap-1">
                <div className="relative">
                    <input 
                        className="   
                        bg-cyan-900 
                        hover:bg-cyan-950 
                        border-cyan-600 
                        shadow-cyan-950/80 
                        focus:ring-cyan-900 
                        text-amber-100
                        font-bold
                        text-center
                        border
                        border-solid
                        rounded-lg
                        border-b-4
                        w-full h-full
                        focus:border-0 
                        focus:ring-2"
                        type="number"
                        step="10"
                        min="10"
                        max={balance}
                        required
                        value={betAmount}
                        onChange={(e) => setBetAmount(Math.min(Number(e.target.value), balance))}
                    />
                    <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col">
                        <button 
                            onClick={() => setBetAmount(prev => Math.min(prev + 10, 100))}
                            className="text-cyan-600 hover:text-amber-100 text-xs"
                        >
                        ▲
                        </button>
                        <button
                          onClick={() => setBetAmount(prev => Math.max(prev - 10, 10))}
                          className="text-cyan-600 hover:text-amber-100 text-xs"
                        >
                        ▼
                        </button>
                    </div>
                </div>
                <Button variant="gold" onClick={handleBet}>BET</Button>
                <Button
                    onClick={onNextRound}
                    disabled={balance <= 0}
                    variant="emerald"
                >
                        NEXT ROUND
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-1">
                <Button
                    variant="primary"
                    onClick={onHit}
                    disabled={!canPlayerAct || hasStood || playerValue > 21}
                >
                    HIT
                </Button>
                <Button
                variant="danger"
                    onClick={onStand}
                    disabled={!canPlayerAct ||  hasStood}
                >
                    STAND
                </Button>
                <Button 
                    variant="gold"
                    onClick={onNewGame}
                >
                    NEW GAME
                </Button>
            </div>

        </div>
    )
}

export default Controls
import { iCard } from "./types";
import { handHeader } from "./utils";
import CardGenerator from "./CardGenerator";

interface PlayerHandProps {
    hand: iCard[];
}

const PlayerHand: React.FC<PlayerHandProps> = ({ hand }) => {
    return (
        <div>
            <h2 className={handHeader}>Your Hand</h2>
            <div className="flex flex-row flex-wrap gap-1">
                {hand.map((card) => (
                    <CardGenerator key={card.value + card.suit} card={card} />
                    ))}
            </div>
        </div>
    )
}

export default PlayerHand
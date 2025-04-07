import { iCard } from "./types";
import { handHeader } from "./utils";
import CardGenerator from "./CardGenerator";

interface DealerHandProps {
    hand: iCard[];
    hideSecondCard?: boolean;
}

const DealerHand: React.FC<DealerHandProps> = ({ hand, hideSecondCard }) => {
    return (
        <div>
            <h2 className={handHeader}>Dealer's Hand</h2>
            <div className="flex flex-row flex-wrap gap-1">
                {hand.map((card, index) => (
                    <CardGenerator 
                        key={card.value + card.suit} 
                        card={card} 
                        hidden={hideSecondCard && index === 1}
                    />
                    ))}
            </div>
        </div>
    )
}

export default DealerHand
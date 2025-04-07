import { iCard, getSuitColor } from "./types";

interface CardProps {
  card: iCard;
  hidden?: boolean;
}

const CardGenerator = ({ card, hidden = false }: CardProps) => {
  const colorClass = getSuitColor(card.suit);

  return (
    <div className={`relative w-24 h-36 ${!hidden ? 'card-animate' : ''}`}>
      {/* Front of card (visible when not hidden) */}
      <div className={`absolute w-full h-full bg-white rounded-md shadow-md border border-gray-300 p-2 transition-all duration-300 ${hidden ? 'opacity-0' : 'opacity-100'}`}>

        {/* Top-left corner */}
        <div className={`absolute top-1 left-2 text-sm font-bold ${colorClass}`}>
          <div>{card.getName()}</div>
          <div className="text-lg">{card.suit}</div>
        </div>

        {/* Center value */}
        <div className={`flex justify-center items-center h-full text-4xl ${colorClass}`}>
          {card.getName()}
        </div>
        {/* Bottom-right corner (rotated) */}
        <div className={`absolute bottom-1 right-2 text-sm font-bold ${colorClass} rotate-180`}>
          <div>{card.getName()}</div>
          <div className="text-lg">{card.suit}</div>
        </div>
      </div>

      {/* Back of card (visible when hidden) */}
      <div 
        className={`absolute w-full h-full rounded-md shadow-lg border-2 border-white transition-all duration-300 card-back ${hidden ? 'opacity-100' : 'opacity-0'}`}
      >
      </div>
    </div>
  );
};

export default CardGenerator;
export enum Suit {
    Clubs = "♣",
    Spades = "♠",
    Hearts = "♥",
    Diamonds = "♦"
}

export const getSuitColor = (suit: Suit): string => {
    return [Suit.Hearts, Suit.Diamonds].includes(suit) 
        ? "text-red-500" 
        : "text-black";
};

export interface iCard {
    value: number;
    suit: Suit
    getName(): string
}

export interface iDeal {
    deal(num: number): iCard[];
    reset(): void;
}

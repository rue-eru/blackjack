import { iCard } from "./types";
import promptSync from 'prompt-sync'; 
const prompt = promptSync(); 
import Deck from "./deck";

export const setChoice = (): "hit" | "stand" => {
    while (true) {
      const choice = prompt("Your action: (hit/stand): ").toLowerCase();
      if (choice === "stand" || choice === "hit") return choice;
    }
  };
  
export const getCurrentValue = (cards: iCard[]): number => {
    let value = 0;
    let ace = 0;

    for (const card of cards) {
        if (card.value === 1) {
            ace++
            continue
        }

        value += Math.min(card.value, 10)
    }

    if (ace === 0) return value;
    if (value >= 11) return value + ace;
    return value + 11 + (ace - 1)
  };

export const setShuffle = <T,>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
      }
      return array;
  };

export const setBet = (balance: number): number => {
    while (true) {
        const bet = prompt("Your bet: ");
        try {
            const input = Number(bet);
            if (input > 0 && input <= balance) {
                return input
            } else {
                console.log("Insufficient balance.")
            }
        } catch {
            console.log("Your bet should not exceed your balance.")
        }
    }
}

export const setHand = (hand: iCard[], hideCard2: boolean = false): string => {
    let value = "";

    for (const [index, card] of hand.entries()) {
        if (index !== 0) value += ", "
        if (index === 1 && hideCard2) {
            value += "[hidden]"
            break
        }
        value += `${card.getName()}${card.suit}`
    }

    return value
}

export const dealerTurn = (hand: iCard[], deck: Deck): iCard[] => {
    let handValue = [...hand];
  
    while (getCurrentValue(handValue) < 17) {
      handValue = [...handValue, ...deck.deal(1)]; // Dealer hits until hand value is >= 17
    }
    return handValue;
};

export const handHeader = "font-bold mb-2";


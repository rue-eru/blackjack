import Card from "./card";
import { iDeal, Suit } from "./types";
import { setShuffle } from "./utils";

class Deck implements iDeal {
    private deck: Card[] = [];

    constructor() {
        this.reset()
    }

    reset() {
        const cards = this.setDeck();
        this.deck = setShuffle(cards);
    }

    deal(num: number): Card[] {
        const playedCards: Card[] = [];

        for (let i = 0; i < num; i++) {
            const card = this.deck.pop();
            playedCards.push(card!)
        }

        return playedCards
    }

    private setDeck() {
        const cards: Card[] = []
        const suits = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs]

        for(let suit = 0; suit < 4; suit++) {
            for (let i = 1; i <= 13; i++) {
                const card = new Card(i, suits[suit])
                cards.push(card);
            }
        }
        return cards
    }
}

export default Deck
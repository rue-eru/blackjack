import { useEffect, useState } from 'react'
import './App.css'
import Deck from './deck'
import { iCard } from "./types";
import { getCurrentValue, dealerTurn } from './utils'
import DealerHand from './DealerHand'
import PlayerHand from './PlayerHand'
import Controls from './Controls'
import Status from './Status'
import Modal from './Modal';

function App() {

  const [deck, setDeck] = useState(new Deck());
  const [playerHand, setPlayerHand] = useState<iCard[]>([]);
  const [dealerHand, setDealerHand] = useState<iCard[]>([]);
  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);
  const [gameStatus, setGameStatus] = useState<"waiting" |"playing" | "won" | "lost" | "tie">("waiting");
  const [hasStood, setHasStood] = useState(false);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleCloseWelcome = () => {
    if (dontShowAgain) {
      localStorage.setItem('hideWelcome', 'true');
    }
    setIsWelcomeOpen(false);
  };

  useEffect(() => {
    if (localStorage.getItem('hideWelcome')) {
      setIsWelcomeOpen(false);
      resetTable();
    }
  }, []);

  const resetTable = () => {
    const newDeck = new Deck();
    newDeck.reset();
    setDeck(newDeck);

    //we start with two cards each
    setPlayerHand(newDeck.deal(2));
    setDealerHand(newDeck.deal(2));
    setHasStood(false);
    setGameStatus("playing");
  }

  const start = () => {
    setBalance(100);
    setBet(0);
    resetTable();
  }

  const handleNextRound = () => {
    setBet(0);
    resetTable();
  }

  const minBet = 5;

  const handleBet = (amount: number) => {
    if (amount > balance || amount < minBet) return;
    setBet(amount);
    setBalance((prev) => prev - amount);
    resetTable();
    setGameStatus("playing");
  }

  const handleHit = () => {
    if (!canPlayerAct || hasStood || getCurrentValue(playerHand) > 21) return;

    //receive one additional card
    const newPlayerHand = [...playerHand, deck.deal(1)[0]];
    setPlayerHand(newPlayerHand);

    const playerValue = getCurrentValue(newPlayerHand);
    if (playerValue > 21) {
      setGameStatus("lost");
    }
  }

  const handleStand = () => {
    // Prevent standing multiple times
    if (hasStood || gameStatus !== "playing") return;

    setHasStood(true);
    const finalDealerHand = dealerTurn(dealerHand, deck);
    setDealerHand(finalDealerHand);

    const dealerValue = getCurrentValue(finalDealerHand);
    const playerValue = getCurrentValue(playerHand);

    if (playerValue > 21) {
      setGameStatus("lost")
    } else if ( dealerValue > 21 || playerValue > dealerValue) {
      setBalance((prev) => prev + bet * 2);
      setGameStatus("won");
    } else if (dealerValue === playerValue) {
      setBalance((prev) => prev + bet);
      setGameStatus("tie")
    } else {
      setGameStatus("lost");
    }
  }

  // No actions allowed if no bet is placed
  const canPlayerAct = gameStatus === "playing" && bet > 0;

  return (
    <>
      <Modal
        open={isWelcomeOpen}
        onClose={handleCloseWelcome}
        className="text-center text-black"
        >
        <h1 className="text-[20px] font-bold mb-4">Welcome to Blackjack!</h1>
        <div className='text-left ml-25'>
          <p className="mb-0.5">• Place your BET to start</p>
          <p className="mb-0.5">• Click HIT to draw cards</p>
          <p className="mb-4">• STAND when you're ready</p>
        </div>
        <div className='flex items-center justify-center mb-4'>
          <input 
            type="checkbox" 
            id='dontShowAgain'
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
            className='mr-2'
          />
          <label htmlFor="dontShowAgain">Don't show this again</label>
        </div>
        <p>Good luck!</p>
      </Modal>
      <p className='font-bold text-right -mt-6 mb-10'>
        Balance: <span className='italic'>
          {balance.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
            })}
        </span>
      </p>
      <div className='inline-flex gap-x-10 mb-10'>
        <DealerHand 
          hand={dealerHand}
          hideSecondCard={!hasStood && gameStatus === "playing"}
        />
        <PlayerHand hand={playerHand} />
      </div>
      <Controls 
        onHit={handleHit}
        onStand={handleStand}
        onBet={handleBet}
        balance={balance}
        hasStood={hasStood}
        playerValue={getCurrentValue(playerHand)}
        onNewGame={start}
        onNextRound={handleNextRound}
        canPlayerAct={canPlayerAct}
      /> 
      <Status status={gameStatus} />
    </>
  )
}

export default App
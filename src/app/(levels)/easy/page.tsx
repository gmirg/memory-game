"use client";
import { useState, useEffect } from "react";
import styles from "../../page.module.css";
import { randomIds } from "../../utils/randomIds";
import { getImages } from "../../utils/getImages";
import { ICharacter } from "../../interfaces/character.interface";
import Image from "next/image";
import Bg from "../../../../public/background.svg";
import Arrow from "../../../../public/arrow.svg";
import Link from "next/link";

export default function Easy() {
  const [board, setBoard] = useState<string[]>([]);
  const [boardData, setBoardData] = useState<string[]>([]);
  const [start, setStart] = useState(false);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize the game when 'start' changes
  useEffect(() => {
    initialize();
  }, [start]);

  // Check for a win condition when 'moves' changes
  useEffect(() => {
    if (matchedCards.length == 16) {
      setGameOver(true);
    }
  }, [moves]);

  const initialize = async () => {
    await generateBoard(); // Generate character image
    shuffle(); // Shuffle cards
    setGameOver(false); // Reset game over state
    setFlippedCards([]); // Clear flipped cards
    setMatchedCards([]); // Clear matched cards
    setMoves(0); // Reset move count
  };

  // Generate the game board with character images
  const generateBoard = async () => {
    try {
      // Generate random character IDs for this level 4x4 game
      let charactersIds = randomIds(8, 826);
      let query = charactersIds.join();
      // Fetch character data from API
      let charactersInfo = (await getImages(query)) as unknown as ICharacter[]; // Type assertion to not get in trouble with map function
      // Extract image URLs from character data
      let imageUrls = charactersInfo.map((character) => character.image);
      setBoard(imageUrls);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  // Shuffle the game cards
  const shuffle = () => {
    const shuffledCards = [...board, ...board] // Since we need pair of data so we will use the static board values twice using the spread operator.
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
    setStart(true);
  };

  // This function updates the cards that you have flipped and/or mactched
  const updateActiveCards = (i: number) => {
    // Checks if the clicked card is not already flipped
    if (!flippedCards.includes(i)) {
      if (flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        // Checks if the flipped card matches the previously flipped card
        if (boardData[firstIdx] == boardData[secondIdx]) {
          // If matched, update the matchedCards state to include both cards
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }
        // Flip the newly clicked card by adding it to the flippedCards state
        setFlippedCards([...flippedCards, i]);
        // If there are already two flipped cards, reset the flipped cards state with the new card
      } else if (flippedCards.length == 2) {
        setFlippedCards([i]);
      // If no cards are flipped yet, sets this card as flipped
      } else {
        // Flip the clicked card by adding it to the flippedCards state
        setFlippedCards([...flippedCards, i]);
      }
      // Increment the move count
      setMoves((v) => v + 1);
    }
  };
  return (
    <div className="container">
      <Image
        className={styles.bgImage}
        src={Bg}
        alt={"background"}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <div className="playground">
        <div className="menu top">
          <Link href="/">
            <Image
              className={styles.logo}
              src={Arrow}
              alt={"back"}
              height={25}
            />
          </Link>
          <p>{`Moves - ${moves}`}</p>
        </div>

        <div className="board">
          {boardData.map((data, i) => {
            const flipped = flippedCards.includes(i) ? true : false;
            const matched = matchedCards.includes(i) ? true : false;
            return (
              <div
                onClick={() => {
                  updateActiveCards(i);
                }}
                key={i}
                className={`card ${flipped || matched ? "active" : ""} ${
                  matched ? "matched" : ""
                } ${gameOver ? "gameover" : ""}`}
              >
                <div
                  className="card-front"
                  style={{ backgroundImage: `url(${data})` }}
                ></div>
                <div className="card-back"></div>
              </div>
            );
          })}
        </div>
        <div className="menu bottom">
          {gameOver ? (
            <div className="message">
              Congratulations!!
              <br />
              Try again →
            </div>
          ) : (
            <p>Have fun!</p>
          )}
          <button onClick={() => initialize()} className={styles.select}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

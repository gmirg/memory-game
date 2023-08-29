"use client";
import { useState, useEffect } from "react";
import styles from "../../page.module.css";
import { randomIds } from "../../utils/randomIds";
import { getImages } from "../../utils/getImages";
import { ICharacter } from "../../interfaces/character.interface";
import Image from "next/image";
import Bg from "../../../../public/background.svg"
import Arrow from "../../../../public/arrow.svg"
import Link from "next/link";


export default function Hard() {
  const [board, setBoard] = useState<string[]>([]);
  const [boardData, setBoardData] = useState<string[]>([]);
  const [start,setStart]= useState(false)
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initialize();
  }, [start]);
  useEffect(() => {
    if (matchedCards.length == 32) {
      setGameOver(true);
    }
  }, [moves]);
  
  const generateBoard = async () => {
    try {
      let charactersIds = randomIds(16, 826);
      let query = charactersIds.join();
      let charactersInfo = (await getImages(query)) as unknown as ICharacter[]; // Type assertion to not get in trouble with map function
      let imageUrls = charactersInfo.map((character) => character.image);
      setBoard(imageUrls)
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  const shuffle = () => {
    const shuffledCards = [...board, ...board] // Since we need pair of data so we will use the static board values twice using the spread operator.
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
    setStart(true)
  };
  const initialize = async() => {
    await generateBoard();
    shuffle();
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    console.log(start)
  };
  /*   This function counts how many cards have you flipped until now
   */
  const updateActiveCards = (i: number) => {
    if (!flippedCards.includes(i)) {
      if (flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] == boardData[secondIdx]) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }

        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length == 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }

      setMoves((v) => v + 1);
    }
  };
  return (
    <div className="container" >
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
      <Link href="/"><Image className={styles.logo} src={Arrow} alt={"back"} height={25} /></Link>
      <p>{`Moves - ${moves}`}</p>
      </div>

      <div className="board">
        
        {
        boardData.map((data, i) => {
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
              <div className="card-front" style={{backgroundImage:`url(${data})`}}></div>
              <div className="card-back"></div>
            </div>
            
          );
        })}
      </div>
      <div className="menu bottom">
        { gameOver ? <div className="message">Congratulations!!<br/>Try again →</div> : <p>Have fun!</p>}
        <button onClick={() => initialize()} className={styles.select}>
          Reset
        </button>
      </div>
      </div>
    </div>
  );
}

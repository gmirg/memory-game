"use client";
import styles from "./page.module.css";
import Image from "next/image";
import Bg from "../../public/background.svg"
import Easy from "./(levels)/easy/page";
import Index from "./(levels)";

export default function Home() {
  return (
    <main className={styles.container}>
      <Image
        className={styles.bgImage}
        src={Bg}
        alt={"background"}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />
      <Index/>
      <div className={styles.board}></div>

    </main>
  );
}

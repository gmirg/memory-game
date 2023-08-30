"use client";
import styles from "./page.module.css";
import Image from "next/image";
import Bg from "../../public/background.svg"
import Logo from "../../public/logo.svg";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
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
      <div className={styles.main}>
      <Image className={styles.logo} src={Logo} layout="responsive" alt={"logo"} height={160} />
      <h1 className={styles.title}>Memory game</h1>
      <div className={styles.buttonRow}>
        <button className={styles.select} type="button" onClick={() => router.push('/easy')}>Easy</button>
        <button className={styles.select} type="button" onClick={() => router.push('/medium')}>Medium</button>
        <button className={styles.select} type="button" onClick={() => router.push('/hard')}>Hard</button>
        {/* <button className={styles.select} type="button">Custom</button> */}
      </div>
    </div>
      <div className={styles.board}></div>

    </main>
  );
}

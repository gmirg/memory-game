'use client'
import styles from "../"
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { useRouter } from 'next/navigation'



const Index = () => {
  const router = useRouter()
  return (
    <div className={styles.main}>
      <Image className={styles.logo} src={Logo} alt={"logo"} height={160} />
      <h1 className={styles.title}>Memory game</h1>
      <div className={styles.buttonRow}>
        <button className={styles.select} type="button" onClick={() => router.push('/easy')}>Easy</button>
        <button className={styles.select} type="button" onClick={() => router.push('/medium')}>Medium</button>
        <button className={styles.select} type="button" onClick={() => router.push('/hard')}>Hard</button>
        <button className={styles.select} type="button">Custom</button>
      </div>
    </div>
  );
};
export default Index;

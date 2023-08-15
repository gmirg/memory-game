import styles from "../page.module.css";
import Image from "next/image";
import Logo from "../../../public/logo.svg";

const Header = () => {
  return (
    <div className={styles.main}>
      <Image src={Logo} alt={"logo"} height={160} />
      <h1 className={styles.title}>Memory game</h1>
      <div className={styles.buttonRow}>
        <button className={styles.select} type="button">Easy</button>
        <button className={styles.select} type="button">Medium</button>
        <button className={styles.select} type="button">Hard</button>
        <button className={styles.select} type="button">Custom</button>
      </div>
    </div>
  );
};
export default Header;

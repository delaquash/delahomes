import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
          <h2>This is the index page</h2>
      </div>
    </main>
  );
}

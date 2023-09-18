import AnimalInfo from "@/components/LostWrite/AnimalInfo";
import styles from "@/styles/pages/lostWrite.module.css";

export default function LostWrite() {
  return (
    <main className={styles.lostWrite_wrapper}>
      <AnimalInfo />
    </main>
  );
}

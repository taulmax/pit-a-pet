import AnimalCard from "@/components/AnimalCard";
import styles from "@/styles/pages/introduction.module.css";

export default function Introduction() {
  const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const chunkSize = 4;
  const fillValue = 0;
  const chunkedArray = [];

  for (let i = 0; i < originalArray.length; i += chunkSize) {
    const chunk = originalArray.slice(i, i + chunkSize);
    while (chunk.length < chunkSize) {
      chunk.push(fillValue);
    }
    chunkedArray.push(chunk);
  }

  return (
    <main className={styles.content_wrapper}>
      {chunkedArray.map((item, index) => (
        <div key={index} className={styles.animal_card_row}>
          {item.map((value) =>
            value !== 0 ? (
              <AnimalCard key={index} />
            ) : (
              <div key={index} className={styles.animal_fake_card}></div>
            )
          )}
        </div>
      ))}
    </main>
  );
}

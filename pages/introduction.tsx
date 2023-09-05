import { fetchPosts } from "@/api/introduction";
import AnimalCard from "@/components/AnimalCard";
import styles from "@/styles/pages/introduction.module.css";
import { useQuery } from "react-query";

export default function Introduction() {
  const originalArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
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

  const { data, isLoading, isError, error } = useQuery("posts", fetchPosts);
  // console.log(data);
  // console.log(isLoading);
  // console.log(isError);
  // console.log(error);

  return (
    <main className={styles.content_wrapper}>
      {chunkedArray.map((item, index) => (
        <div key={`row${index}`} className={styles.animal_card_row}>
          {item.map((value) =>
            value !== 0 ? (
              <AnimalCard id={value} key={value} />
            ) : (
              <div key={value} className={styles.animal_fake_card}></div>
            )
          )}
        </div>
      ))}
    </main>
  );
}

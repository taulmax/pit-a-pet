import { IdleData, getIdle } from "@/api/introduction";
import AnimalCard from "@/components/AnimalCard";
import Pagination from "@/components/Pagination";
import styles from "@/styles/pages/introduction.module.css";
import { formatDate } from "@/util/util";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function Introduction() {
  const { query } = useRouter();

  const currentDate = new Date();
  const threeMonthsAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 3,
    currentDate.getDate()
  );

  const { data, isLoading, isError } = useQuery(["idle", query], () =>
    getIdle({
      page: query.page ? Number(query.page) : 1,
      pageSize: 20,
      startDate: formatDate(threeMonthsAgo)["yyyy-mm-dd"],
      endDate: formatDate(currentDate)["yyyy-mm-dd"],
    })
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data?.data.length) {
    return <div>No data available</div>;
  }

  const chunkSize = 4;
  const fakeValue = { desertionNo: "fake" };
  const chunkedArray = [];

  for (let i = 0; i < data?.data.length; i += chunkSize) {
    const chunk: any[] = data.data.slice(i, i + chunkSize);
    while (chunk.length < chunkSize) {
      chunk.push(fakeValue);
    }
    chunkedArray.push(chunk);
  }

  return (
    <main className={styles.content_wrapper}>
      {chunkedArray.map((item, index) => (
        <div key={`row${index}`} className={styles.animal_card_row}>
          {item.map((idleData: IdleData, idleIndex: number) =>
            idleData.desertionNo !== "fake" ? (
              <AnimalCard idleData={idleData} key={idleData.desertionNo} />
            ) : (
              <div
                key={idleData.desertionNo + idleIndex}
                className={styles.animal_fake_card}
              ></div>
            )
          )}
        </div>
      ))}
      <Pagination
        currentPage={1}
        pageCount={10}
        onPageChange={() => console.log("asd")}
      />
    </main>
  );
}

import { IdleData, getIdle } from "@/api/introduction";
import AnimalCard from "@/components/AnimalCard/AnimalCard";
import Pagination from "@/components/Pagination";
import { Select } from "@/components/form/Select";
import styles from "@/styles/pages/introduction.module.css";
import { formatDate } from "@/util/util";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useCallback } from "react";
import { useQuery } from "react-query";

// query 프롭스에 대한 타입 정의
type IntroductionProps = {
  query: {
    page?: string;
  };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      query,
    },
  };
};

export default function Introduction({ query }: IntroductionProps) {
  const router = useRouter();
  const currentPage = query.page ? Number(query.page) : 1;

  const onPageChange = useCallback(
    (page: number) => {
      router.push(`/introduction?page=${page}`);
      const element = document.getElementById("introduction_main_wrapper");
      if (element) {
        element.scrollTop = 0;
      }
    },
    [router]
  );

  const currentDate = new Date();
  const threeMonthsAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 3,
    currentDate.getDate()
  );

  const { data, isLoading, isError } = useQuery(["idle", query], () =>
    getIdle({
      page: currentPage,
      pageSize: 20,
      startDate: formatDate(threeMonthsAgo)["yyyy-mm-dd"],
      endDate: formatDate(currentDate)["yyyy-mm-dd"],
    })
  );

  const onChangeSelect = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {},
    []
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
    <main id="introduction_main_wrapper" className={styles.content_wrapper}>
      <header className={styles.filter_header}>
        <div className={styles.filter_wrapper}>
          <Select
            id="type"
            option={[
              { id: "", value: "", text: "품종을 선택해주세요" },
              { id: "dog", value: "개", text: "강아지" },
              { id: "cat", value: "고양이", text: "고양이" },
              { id: "rest", value: "기타", text: "기타" },
            ]}
            onChange={onChangeSelect}
          />
          <Select
            id="isUnderProtection"
            option={[
              { id: "", value: "", text: "보호 여부를 선택해주세요" },
              { id: "protected", value: "protected", text: "보호중" },
              { id: "unprotected", value: "unprotected", text: "보호종료" },
            ]}
            onChange={onChangeSelect}
          />
          <Select
            id="region"
            option={[
              { id: "", value: "", text: "지역을 선택해주세요" },
              { id: "seoul", value: "seoul", text: "서울" },
              { id: "busan", value: "busan", text: "부산" },
              { id: "daegue", value: "daegue", text: "대구" },
              { id: "incheon", value: "incheon", text: "인천" },
              { id: "gwangju", value: "gwangju", text: "광주" },
              { id: "daejun", value: "daejun", text: "대전" },
              { id: "ulsan", value: "ulsan", text: "울산" },
              { id: "sejong", value: "sejong", text: "세종" },
              { id: "gyeongi", value: "gyeongi", text: "경기도" },
              { id: "gangwon", value: "gangwon", text: "강원도" },
              { id: "chungbuk", value: "chungbuk", text: "충청북도" },
              { id: "chungnam", value: "chungnam", text: "충청남도" },
              { id: "junbuk", value: "junbuk", text: "전라북도" },
              { id: "junnam", value: "junnam", text: "전라남도" },
              { id: "gyeongbuk", value: "gyeongbuk", text: "경상북도" },
              { id: "gyeongnam", value: "gyeongnam", text: "경상남도" },
              { id: "jeju", value: "jeju", text: "제주" },
            ]}
            onChange={onChangeSelect}
          />
        </div>
      </header>
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
        currentPage={currentPage}
        pageCount={data.pageCount}
        onPageChange={onPageChange}
      />
    </main>
  );
}

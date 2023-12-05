import { IdleData, getIdle } from "@/api/introduction";
import AnimalCard from "@/components/AnimalCard/AnimalCard";
import Pagination from "@/components/Pagination";
import { Select } from "@/components/form/Select";
import styles from "@/styles/pages/introduction.module.css";
import { formatDate } from "@/util/util";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";

// query 프롭스에 대한 타입 정의
type IntroductionProps = {
  query: {
    page?: string;
  };
};

type selectType = "" | "dog" | "cat" | "rest";
type selectIsUnderProtection = "" | "Y" | "N";
type selectRegion =
  | ""
  | "서울"
  | "부산"
  | "대구"
  | "인천"
  | "광주"
  | "대전"
  | "울산"
  | "세종"
  | "경기도"
  | "강원도"
  | "충청북도"
  | "충청남도"
  | "전라북도"
  | "전라남도"
  | "경상북도"
  | "경상남도"
  | "제주";

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

  const [type, setType] = useState<selectType>("");
  const [isUnderProtection, setIsUnderProtection] =
    useState<selectIsUnderProtection>("");
  const [region, setRegion] = useState<selectRegion>("");

  const { data, isLoading, isError } = useQuery(
    ["idle", query, type, isUnderProtection, region],
    () => {
      const data: any = {
        page: currentPage,
        pageSize: 20,
        startDate: formatDate(threeMonthsAgo)["yyyy-mm-dd"],
        endDate: formatDate(currentDate)["yyyy-mm-dd"],
      };
      if (type) {
        data.type = type;
      }
      if (isUnderProtection) {
        data.isUnderProtection = isUnderProtection;
      }
      if (region) {
        data.region = region;
      }
      return getIdle(data);
    }
  );

  const onChangeSelectType = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      setType(e.target.value as selectType);
    },
    []
  );
  const onChangeSelectIsUnderProtection = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      setIsUnderProtection(e.target.value as selectIsUnderProtection);
    },
    []
  );
  const onChangeSelectRegion = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRegion(e.target.value as selectRegion);
    },
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
            value={type}
            option={[
              { id: "", value: "", text: "품종을 선택해주세요" },
              { id: "dog", value: "개", text: "강아지" },
              { id: "cat", value: "고양이", text: "고양이" },
              { id: "rest", value: "기타", text: "기타" },
            ]}
            onChange={onChangeSelectType}
          />
          <Select
            id="isUnderProtection"
            value={isUnderProtection}
            option={[
              { id: "", value: "", text: "보호 여부를 선택해주세요" },
              { id: "protected", value: "Y", text: "보호중" },
              { id: "unprotected", value: "N", text: "보호종료" },
            ]}
            onChange={onChangeSelectIsUnderProtection}
          />
          <Select
            id="region"
            value={region}
            option={[
              { id: "", value: "", text: "지역을 선택해주세요" },
              { id: "seoul", value: "서울", text: "서울" },
              { id: "busan", value: "부산", text: "부산" },
              { id: "daegue", value: "대구", text: "대구" },
              { id: "incheon", value: "인천", text: "인천" },
              { id: "gwangju", value: "광주", text: "광주" },
              { id: "daejun", value: "대전", text: "대전" },
              { id: "ulsan", value: "울산", text: "울산" },
              { id: "sejong", value: "세종", text: "세종" },
              { id: "gyeongi", value: "경기도", text: "경기도" },
              { id: "gangwon", value: "강원도", text: "강원도" },
              { id: "chungbuk", value: "충청북도", text: "충청북도" },
              { id: "chungnam", value: "충청남도", text: "충청남도" },
              { id: "junbuk", value: "전라북도", text: "전라북도" },
              { id: "junnam", value: "전라남도", text: "전라남도" },
              { id: "gyeongbuk", value: "경상북도", text: "경상북도" },
              { id: "gyeongnam", value: "경상남도", text: "경상남도" },
              { id: "jeju", value: "제주", text: "제주" },
            ]}
            onChange={onChangeSelectRegion}
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

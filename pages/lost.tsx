import { LostData, getLost } from "@/api/lost";
import LostAnimalCard from "@/components/AnimalCard/LostAnimalCard";
import Pagination from "@/components/Pagination";
import styles from "@/styles/pages/introduction.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useGlobalState } from "@/context/GlobalStateContext";
import LoginDialog from "@/components/form/LoginDialog";
import Input from "@/components/form/Input";
import Button from "@/components/Button";
import { Select } from "@/components/form/Select";

// query 프롭스에 대한 타입 정의
type LostProps = {
  query: {
    page?: string;
  };
};

type selectType = "" | "dog" | "cat" | "rest";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  return {
    props: {
      query,
    },
  };
};

export default function Lost({ query }: LostProps) {
  const router = useRouter();
  const currentPage = query.page ? Number(query.page) : 1;
  const { isLogin } = useGlobalState();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [type, setType] = useState<selectType>("");
  const onChangeSelectType = useCallback(
    async (e: React.ChangeEvent<HTMLSelectElement>) => {
      setType(e.target.value as selectType);
    },
    []
  );

  const [searchRegion, setSearchRegion] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const [searchFlag, setSearchFlag] = useState<number>(0);
  const onChangeSearchRegion = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchRegion(e.target.value);
    },
    []
  );
  const onChangeSearchName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchName(e.target.value);
    },
    []
  );
  const onClickSearch = useCallback(() => {
    setSearchFlag((state) => state + 1);
  }, []);

  const onPageChange = useCallback(
    (page: number) => {
      router.push(`/lost?page=${page}`);
      const element = document.getElementById("introduction_main_wrapper");
      if (element) {
        element.scrollTop = 0;
      }
    },
    [router]
  );

  const { data, isLoading, isError } = useQuery(
    ["lost", query, type, searchFlag],
    () => {
      const requestData: any = { page: currentPage, pageSize: 20 };
      if (type) {
        requestData.type = type;
      }
      if (searchFlag) {
        requestData.region = searchRegion;
        requestData.name = searchName;
      }
      return getLost(requestData);
    }
  );

  // 글쓰기 버튼 클릭
  const onClickWriteButton = useCallback(() => {
    if (isLogin) {
      router.push("/lostWrite");
    } else {
      dialogRef.current?.showModal();
    }
  }, [isLogin, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data?.data.length) {
    return (
      <main id="introduction_main_wrapper" className={styles.content_wrapper}>
        <div>No data available</div>

        {/* 우리 아이 찾기 글쓰기 FIXED BUTTON */}
        <div onClick={onClickWriteButton} className={styles.write_button}>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </main>
    );
  }

  const chunkSize = 4;
  const fakeValue = { lostNo: "fake" };
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
      <header>
        <div className={styles.header_wrapper}>
          <div className={styles.type_filter}>
            <Select
              id="type"
              value={type}
              option={[
                { id: "", value: "", text: "품종을 선택해주세요" },
                { id: "dog", value: "dog", text: "강아지" },
                { id: "cat", value: "cat", text: "고양이" },
                { id: "rest", value: "rest", text: "기타" },
              ]}
              onChange={onChangeSelectType}
              customDivStyle={{ marginTop: 0, height: "48px" }}
            />
          </div>
          <div className={styles.search_box}>
            <Input
              value={searchRegion}
              onChange={onChangeSearchRegion}
              placeholder="지역을 입력해주세요."
              textAlign="left"
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  onClickSearch();
                }
              }}
              customDivStyle={{
                marginTop: 0,
                height: "48px",
                width: "200px",
              }}
            />
            <Input
              value={searchName}
              onChange={onChangeSearchName}
              placeholder="이름을 입력해주세요."
              textAlign="left"
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  onClickSearch();
                }
              }}
              customDivStyle={{
                marginTop: 0,
                height: "48px",
                width: "200px",
                marginLeft: "4px",
              }}
            />
            <Button
              text="검색"
              color="logo"
              onClick={onClickSearch}
              customButtonStyle={{
                width: "80px",
                borderRadius: "8px",
                fontSize: "14px",
                marginLeft: "4px",
              }}
            />
          </div>
        </div>
      </header>
      {chunkedArray.map((item, index) => (
        <div key={`row${index}`} className={styles.animal_card_row}>
          {item.map((lostData: LostData, lostIndex: number) =>
            lostData.lostNo !== "fake" ? (
              <LostAnimalCard key={lostData.lostNo} lostData={lostData} />
            ) : (
              <div
                key={lostData.lostNo + lostIndex}
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

      {/* 우리 아이 찾기 글쓰기 FIXED BUTTON */}
      <div onClick={onClickWriteButton} className={styles.write_button}>
        <FontAwesomeIcon icon={faPen} />
      </div>
      <dialog ref={dialogRef}>
        <LoginDialog dialogRef={dialogRef} />
      </dialog>
    </main>
  );
}

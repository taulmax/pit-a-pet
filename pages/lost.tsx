import { LostData, getLost } from "@/api/lost";
import LostAnimalCard from "@/components/AnimalCard/LostAnimalCard";
import Pagination from "@/components/Pagination";
import styles from "@/styles/pages/introduction.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next/types";
import { useCallback, useRef } from "react";
import { useQuery } from "react-query";
import { useGlobalState } from "@/context/GlobalStateContext";
import LoginDialog from "@/components/form/LoginDialog";

// query 프롭스에 대한 타입 정의
type LostProps = {
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

export default function Lost({ query }: LostProps) {
  const router = useRouter();
  const currentPage = query.page ? Number(query.page) : 1;
  const { isLogin } = useGlobalState();

  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const { data, isLoading, isError } = useQuery(["lost", query], () =>
    getLost({
      page: currentPage,
      pageSize: 20,
    })
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

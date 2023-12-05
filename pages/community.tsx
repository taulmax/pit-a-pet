import { getStory } from "@/api/community";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import Input from "@/components/form/Input";
import LoginDialog from "@/components/form/LoginDialog";
import { useGlobalState } from "@/context/GlobalStateContext";
import styles from "@/styles/pages/community.module.css";
import { formatTimeDifference } from "@/util/util";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";

// query 프롭스에 대한 타입 정의
type CommunityProps = {
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

export default function Community({ query }: CommunityProps) {
  const router = useRouter();
  const currentPage = query.page ? Number(query.page) : 1;

  const [isNewOrHot, setIsNewOrHot] = useState<"new" | "hot">("new");
  const onClickIsNewOrHot = useCallback((type: "new" | "hot") => {
    setIsNewOrHot(type);
  }, []);

  const [searchText, setSearchText] = useState<string>("");
  const [searchFlag, setSearchFlag] = useState<number>(0);
  const onChangeSearchText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    },
    []
  );
  const onClickSearch = useCallback(() => {
    setSearchFlag((state) => state + 1);
  }, []);

  const { isLogin, resetStory } = useGlobalState();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onClickStory = useCallback(
    (id: number) => {
      router.push(`/community/${id}`);
    },
    [router]
  );

  const onPageChange = useCallback(
    (page: number) => {
      router.push(`/community?page=${page}`);
      const element = document.getElementById("community_main_wrapper");
      if (element) {
        element.scrollTop = 0;
      }
    },
    [router]
  );

  const { data, isLoading, isError } = useQuery(
    ["story", query, isNewOrHot, searchFlag],
    () => {
      const data: any = { page: currentPage, pageSize: 20 };
      if (isNewOrHot === "hot") {
        data.hot = 1;
      }
      if (searchFlag > 0) {
        data.title = searchText;
      }
      return getStory(data);
    }
  );

  // 글쓰기 버튼 클릭
  const onClickWriteButton = useCallback(() => {
    if (isLogin) {
      resetStory();
      router.push("/communityWrite");
    } else {
      dialogRef.current?.showModal();
    }
  }, [isLogin, resetStory, router]);

  if (isLoading) {
    return (
      <main
        id="community_main_wrapper"
        className={styles.community_main_wrapper}
      >
        <header>
          <div className={styles.community_recent_or_hot_tab}>
            <div
              onClick={() => onClickIsNewOrHot("new")}
              className={isNewOrHot === "new" ? styles.active : ""}
            >
              최신글
            </div>
            <div
              onClick={() => onClickIsNewOrHot("hot")}
              className={isNewOrHot === "hot" ? styles.active : ""}
            >
              인기글
            </div>
          </div>
          <div className={styles.search_box}>
            <Input
              value={searchText}
              onChange={onChangeSearchText}
              placeholder="게시글 제목을 입력해주세요."
              textAlign="left"
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  onClickSearch();
                }
              }}
              customDivStyle={{
                marginTop: 0,
                height: "48px",
                width: "400px",
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
        </header>
        <ul>
          <li className={styles.community_th}>
            <div className={styles.number}>번호</div>
            <div className={styles.title}>제목</div>
            <div className={styles.author}>작성자</div>
            <div className={styles.date}>날짜</div>
            <div className={styles.visit}>조회</div>
            <div className={styles.thumbsup}>추천</div>
          </li>
        </ul>

        {/* 글쓰기 FIXED BUTTON */}
        <div onClick={onClickWriteButton} className={styles.write_button}>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </main>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data?.data.length) {
    return (
      <main
        id="community_main_wrapper"
        className={styles.community_main_wrapper}
      >
        <div>아직 등록된 글이 없어요!</div>

        {/* 우리 아이 찾기 글쓰기 FIXED BUTTON */}
        <div onClick={onClickWriteButton} className={styles.write_button}>
          <FontAwesomeIcon icon={faPen} />
        </div>
      </main>
    );
  }

  return (
    <main id="community_main_wrapper" className={styles.community_main_wrapper}>
      <header>
        <div className={styles.community_recent_or_hot_tab}>
          <div
            onClick={() => onClickIsNewOrHot("new")}
            className={isNewOrHot === "new" ? styles.active : ""}
          >
            최신글
          </div>
          <div
            onClick={() => onClickIsNewOrHot("hot")}
            className={isNewOrHot === "hot" ? styles.active : ""}
          >
            인기글
          </div>
        </div>
        <div className={styles.search_box}>
          <Input
            value={searchText}
            onChange={onChangeSearchText}
            placeholder="게시글 제목을 입력해주세요."
            textAlign="left"
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                onClickSearch();
              }
            }}
            customDivStyle={{
              marginTop: 0,
              height: "48px",
              width: "400px",
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
      </header>
      <ul>
        <li className={styles.community_th}>
          <div className={styles.number}>번호</div>
          <div className={styles.title}>제목</div>
          <div className={styles.author}>작성자</div>
          <div className={styles.date}>날짜</div>
          <div className={styles.visit}>조회</div>
          <div className={styles.thumbsup}>추천</div>
        </li>
        {data.data.map((story) => (
          <li
            onClick={() => onClickStory(story.post_id)}
            key={story.post_id}
            className={styles.community_tr}
          >
            <div className={styles.number}>{story.post_id}</div>
            <div className={styles.title}>{story.title}</div>
            <div className={styles.author}>{story.username}</div>
            <div className={styles.date}>
              {formatTimeDifference(story.created_at)}
            </div>
            <div className={styles.visit}>{story.view}</div>
            <div className={styles.thumbsup}>{story.like}</div>
          </li>
        ))}
      </ul>

      {/* 글쓰기 FIXED BUTTON */}
      <div onClick={onClickWriteButton} className={styles.write_button}>
        <FontAwesomeIcon icon={faPen} />
      </div>
      <dialog ref={dialogRef}>
        <LoginDialog dialogRef={dialogRef} />
      </dialog>
      <Pagination
        currentPage={currentPage}
        pageCount={data.pageCount}
        onPageChange={onPageChange}
      />
    </main>
  );
}

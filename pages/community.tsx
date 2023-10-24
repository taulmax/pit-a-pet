import { getStory } from "@/api/community";
import styles from "@/styles/pages/community.module.css";
import { formatTimeDifference } from "@/util/util";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useQuery } from "react-query";

// query 프롭스에 대한 타입 정의
type CommunityProps = {
  query: {
    page?: string;
    type?: "recent" | "hot";
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
  const currentType = query.type ? query.type : "recent";

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

  const { data, isLoading, isError } = useQuery(["story", query], () =>
    getStory({
      page: currentPage,
      pageSize: 20,
    })
  );

  // 글쓰기 버튼 클릭
  const onClickWriteButton = useCallback(() => {
    router.push("/communityWrite");
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
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
        <div>No data available</div>

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
          <div className={currentType === "recent" ? styles.active : ""}>
            최신글
          </div>
          <div className={currentType === "hot" ? styles.active : ""}>
            인기글
          </div>
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
            <div className={styles.visit}>39</div>
            <div className={styles.thumbsup}>8</div>
          </li>
        ))}
      </ul>

      {/* 글쓰기 FIXED BUTTON */}
      <div onClick={onClickWriteButton} className={styles.write_button}>
        <FontAwesomeIcon icon={faPen} />
      </div>
    </main>
  );
}

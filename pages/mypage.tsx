import { IdleData } from "@/api/introduction";
import { LostData } from "@/api/lost";
import AnimalCard from "@/components/AnimalCard/AnimalCard";
import LostAnimalCard from "@/components/AnimalCard/LostAnimalCard";
import { useGlobalState } from "@/context/GlobalStateContext";
import styles from "@/styles/pages/mypage.module.css";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

interface IStory {
  post_id: number;
  username: string;
  title: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  content: string;
  view: number;
  like: number;
}

export default function Mypage() {
  const { myPageData } = useGlobalState();
  const router = useRouter();

  const chunkSize = 4;
  const fakeValue = { desertionNo: "fake" };
  const chunkedArray = [];

  for (let i = 0; i < myPageData?.dibList?.length; i += chunkSize) {
    const chunk: any[] = myPageData?.dibList.slice(i, i + chunkSize);
    while (chunk.length < chunkSize) {
      chunk.push(fakeValue);
    }
    chunkedArray.push(chunk);
  }

  const lostChunkSize = 4;
  const lostFakeValue = { lostNo: "fake" };
  const lostChunkedArray = [];

  for (let i = 0; i < myPageData?.lostList?.length; i += lostChunkSize) {
    const chunk: any[] = myPageData?.lostList.slice(i, i + lostChunkSize);
    while (chunk.length < lostChunkSize) {
      chunk.push(lostFakeValue);
    }
    lostChunkedArray.push(chunk);
  }

  const onClickStory = useCallback(
    (id: number) => {
      router.push(`/community/${id}`);
    },
    [router]
  );

  return (
    <main id="mypage_main_wrapper" className={styles.content_wrapper}>
      <div className={styles.dib_wrapper}>
        <header>
          <h1>내가 찜한 아이들</h1>
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
        {chunkedArray.length === 0 && (
          <div className={styles.no_dib_wrapper}>
            <div className={styles.no_dib}>아직 찜한 아이들이 없어요!</div>
          </div>
        )}
      </div>

      <div className={styles.dib_wrapper} style={{ marginTop: "20px" }}>
        <header>
          <h1>내 아이가 사라졌어요</h1>
        </header>
        {lostChunkedArray.map((item, index) => (
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
        {lostChunkedArray.length === 0 && (
          <div className={styles.no_dib_wrapper}>
            <div className={styles.no_dib}>
              아직 사라진 아이가 없어요. 다행이에요!
            </div>
          </div>
        )}
      </div>
      <div className={styles.post_wrapper}>
        <div className={styles.my_post_wrapper}>
          <header>
            <h1>내가 쓴 글</h1>
          </header>
          <ul>
            <li className={styles.community_th}>
              <div className={styles.title}>제목</div>
              <div className={styles.visit}>조회</div>
              <div className={styles.thumbsup}>추천</div>
            </li>
            {myPageData?.myPosting.map((story: IStory) => (
              <li
                onClick={() => onClickStory(story.post_id)}
                key={story.post_id}
                className={styles.community_tr}
              >
                <div className={styles.title}>{story.title}</div>
                <div className={styles.visit}>{story.view}</div>
                <div className={styles.thumbsup}>{story.like}</div>
              </li>
            ))}
            {myPageData?.myPosting.length === 0 && (
              <div className={styles.no_post}>아직 작성한 글이 없어요!</div>
            )}
          </ul>
        </div>
        <div className={styles.my_like_wrapper}>
          <header>
            <h1>내가 좋아요 누른 글</h1>
          </header>
          <ul>
            <li className={styles.community_th}>
              <div className={styles.title}>제목</div>
              <div className={styles.visit}>조회</div>
              <div className={styles.thumbsup}>추천</div>
            </li>
            {myPageData?.likeList.map((story: IStory) => (
              <li
                onClick={() => onClickStory(story.post_id)}
                key={story.post_id}
                className={styles.community_tr}
              >
                <div className={styles.title}>{story.title}</div>
                <div className={styles.visit}>{story.view}</div>
                <div className={styles.thumbsup}>{story.like}</div>
              </li>
            ))}
            {myPageData?.likeList.length === 0 && (
              <div className={styles.no_post}>
                아직 좋아요 누른 글이 없어요!
              </div>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

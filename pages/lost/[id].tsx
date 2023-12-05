import { formatDate, formatTimeDifference, koreanType } from "@/util/util";
import { useRouter } from "next/router";
import styles from "@/styles/pages/introductionDetail.module.css";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { getLostDetail, useLostReply } from "@/api/lost";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import Textarea from "@/components/form/Textarea";
import Button from "@/components/Button";
import LoginDialog from "@/components/form/LoginDialog";

export default function LostDetail() {
  const router = useRouter();
  const { id } = router.query;

  const dialogRef = useRef<HTMLDialogElement>(null);

  // 실종 상세정보 전역상태
  const { lostDetail, setLostDetail, myPageData, isLogin } = useGlobalState();

  const [reply, setReply] = useState<string>("");
  const onChangeReply = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReply(e.target.value);
    },
    []
  );

  // React Query를 사용하여 API 데이터를 가져오는 훅을 정의
  const { data, error } = useQuery(
    "LostDetail",
    () => getLostDetail(id as string),
    {
      // 캐시 설정
      enabled: !!id,
    }
  );

  const { postLostReply, deleteMyReply } = useLostReply();
  const onClickReply = useCallback(() => {
    if (isLogin) {
      postLostReply({ lostNo: data?.lostNo as string, content: reply });
    } else {
      dialogRef.current?.showModal();
    }
  }, [data?.lostNo, isLogin, postLostReply, reply]);
  const onClickDeleteReply = useCallback(
    (reply_id: any) => {
      deleteMyReply({ reply_id: reply_id });
    },
    [deleteMyReply]
  );

  useEffect(() => {
    if (data) {
      setLostDetail(data);
    }
  }, [data, setLostDetail]);

  if (!lostDetail) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className={styles.lost_detail_wrapper}>
      <div className={styles.introduction_detail_wrapper}>
        <div className={styles.image_wrapper}>
          <Image
            className={styles.animal_image}
            src={lostDetail.images.image1}
            alt="thumbnail"
            priority={true}
            width={500}
            height={500}
          />
        </div>
        <ul className={styles.animal_info_wrapper}>
          <li className={styles.animal_title}>
            [{koreanType(lostDetail.type)}] {lostDetail.petName}
          </li>
          <li className={styles.default_info}>
            {lostDetail.sexCd === "boy" ? (
              <div>남자</div>
            ) : lostDetail.sexCd === "girl" ? (
              <div>여자</div>
            ) : (
              <></>
            )}
            {lostDetail.neuterYn === "Y" ? (
              <div>중성화</div>
            ) : lostDetail.neuterYn === "N" ? (
              <div>중성화 X</div>
            ) : (
              <></>
            )}
            {lostDetail.furColor && <div>{lostDetail.furColor}</div>}
            {lostDetail.age && <div>{lostDetail.age}(살)</div>}
            {lostDetail.weight && <div>{lostDetail.weight}(kg)</div>}
          </li>
          <li className={styles.animal_info_list}>
            <span className={styles.list_title}>실종일자</span>{" "}
            <span className={styles.list_content}>
              {formatDate(lostDetail.lostDate)["yy.mm.dd"]}
            </span>
          </li>
          <li className={styles.animal_info_list}>
            <span className={styles.list_title}>실종 장소</span>{" "}
            <span className={styles.list_content}>{lostDetail.lostPlace}</span>
          </li>
          <li className={styles.animal_info_list}>
            <span className={styles.list_title}>전화번호</span>{" "}
            <span className={styles.list_content}>{lostDetail.tel}</span>
          </li>
          <li className={styles.animal_info_list}>
            <span className={styles.list_title}>사례금</span>{" "}
            <span className={styles.list_content}>
              {lostDetail.reward ? `${lostDetail.reward} ₩` : "X"}
            </span>
          </li>
          <li className={`${styles.animal_info_list} ${styles.block}`}>
            <span className={styles.list_title}>내용</span>{" "}
            <div className={styles.list_content}>{lostDetail.detail}</div>
          </li>
        </ul>
      </div>

      <div className={styles.reply_write_wrapper}>
        <Textarea
          value={reply}
          onChange={onChangeReply}
          reply={true}
          maxLength={100}
          placeholder="댓글을 작성해주세요!"
        />
        <div className={styles.reply_button_wrapper}>
          <div>
            <Button
              text="등록"
              color="logo"
              onClick={onClickReply}
              customButtonStyle={{
                width: "80px",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            />
          </div>
        </div>
      </div>

      <ul className={styles.reply_list}>
        {data?.replies.map((reply) => (
          <li key={reply.reply_id} className={styles.reply_wrapper}>
            <div className={styles.user_thumbnail}>
              <FontAwesomeIcon icon={faCircleUser} />
            </div>
            <div className={styles.reply_content_wrapper}>
              <header className={styles.reply_content_header}>
                <div className={styles.reply_content_header_left}>
                  <div className={styles.reply_user}>{reply.username}</div>
                  <div className={styles.reply_time}>
                    ({formatTimeDifference(reply.created_at)})
                  </div>
                </div>
                <div className={styles.reply_content_header_right}>
                  {reply.username === myPageData?.user?.username && (
                    <div
                      onClick={() => onClickDeleteReply(reply.reply_id)}
                      className={styles.reply_update_delete_button}
                    >
                      삭제
                    </div>
                  )}
                </div>
              </header>
              <div className={styles.reply_content}>{reply.content}</div>
            </div>
          </li>
        ))}
      </ul>
      <dialog ref={dialogRef}>
        <LoginDialog dialogRef={dialogRef} />
      </dialog>
    </div>
  );
}

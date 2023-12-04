import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getStoryDetail, useDeleteStory, useReply } from "@/api/community";
import styles from "@/styles/pages/communityDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Textarea from "@/components/form/Textarea";
import { useCallback, useState } from "react";
import Button from "@/components/Button";
import { formatDate, formatTimeDifference } from "@/util/util";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function StoryDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { myPageData } = useGlobalState();

  const [reply, setReply] = useState<string>("");
  const onChangeReply = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReply(e.target.value);
    },
    []
  );

  const { postReply, isReplyLoading } = useReply();
  const { deleteMyStory } = useDeleteStory();

  // React Query를 사용하여 API 데이터를 가져오는 훅을 정의
  const { data, isLoading, isError } = useQuery(
    "StoryDetail",
    () => getStoryDetail(id as string),
    {
      enabled: !!id,
    }
  );

  const onClickReply = useCallback(() => {
    postReply({ post_id: data?.post.post_id, content: reply });
  }, [data?.post.post_id, postReply, reply]);

  const onClickDeleteStory = useCallback(() => {
    deleteMyStory({ post_id: data?.post.post_id });
  }, [data?.post.post_id, deleteMyStory]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <main className={styles.community_detail_main_wrapper}>
      <header className={styles.story_header}>
        <div className={styles.story_title_wrapper}>
          <div className={styles.story_title}>{data?.post.title}</div>
          <div className={styles.story_author}>{data?.post.username}</div>
        </div>
        <div className={styles.story_info}>
          <div className={styles.date}>
            {data && formatDate(data?.post.created_at).timestamp}
          </div>
          <div className={styles.numbers}>
            <div className={styles.numbers_item}>
              <FontAwesomeIcon icon={faEye} />
              {data?.post.view}
            </div>
            <div className={styles.numbers_item}>
              <FontAwesomeIcon icon={faComment} />
              {data?.replies.length}
            </div>
            <div className={styles.numbers_item}>
              <FontAwesomeIcon icon={faThumbsUp} />
              {data?.post.like}
            </div>
          </div>
        </div>
      </header>
      <div className={styles.story_content_wrapper}>
        <div className={styles.story_content}>{data?.post.content}</div>
        <div className={styles.story_thumbs}>
          <div className={styles.thumbs_up}>
            <FontAwesomeIcon icon={faThumbsUp} />
            {data?.post.like}
          </div>
        </div>
        {data?.post.username === myPageData?.user?.username && (
          <div className={styles.story_update_delete_wrapper}>
            <div className={styles.story_update_button}>수정</div>
            <div>&nbsp;|&nbsp;</div>
            <div
              onClick={onClickDeleteStory}
              className={styles.story_update_button}
            >
              삭제
            </div>
          </div>
        )}
      </div>
      <div className={styles.reply_write_wrapper}>
        <Textarea
          value={reply}
          onChange={onChangeReply}
          reply={true}
          placeholder="댓글을 작성해주세요!"
        />
        <div className={styles.reply_button_wrapper}>
          <div>
            <Button text="등록" onClick={onClickReply} color="logo" />
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
                  <div className={styles.reply_update_delete_button}>수정</div>
                  <div>&nbsp;|&nbsp;</div>
                  <div className={styles.reply_update_delete_button}>삭제</div>
                </div>
              </header>
              <div className={styles.reply_content}>{reply.content}</div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

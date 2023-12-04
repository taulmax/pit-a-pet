import Button from "@/components/Button";
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import { useCallback, useEffect, useState } from "react";
import styles from "@/styles/pages/communityWrite.module.css";
import inputStyles from "@/styles/components/form/Input.module.css";
import textareaStyles from "@/styles/components/form/Textarea.module.css";
import { useStory, useUpdateStory } from "@/api/community";
import { useGlobalState } from "@/context/GlobalStateContext";

export default function CommunityWrite() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { story } = useGlobalState();

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setContent(story.content);
    }
  }, [story]);

  const { postStory, isLoading } = useStory();
  const { updateMyStory } = useUpdateStory();

  const onClickSubmit = useCallback(() => {
    if (story) {
      updateMyStory({
        post_id: story.post_id,
        title,
        content,
      });
    } else {
      postStory({ title, content });
    }
  }, [content, postStory, story, title, updateMyStory]);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const onChangeContents = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  return (
    <main className={styles.community_write_wrapper}>
      <Input
        value={title}
        onChange={onChangeTitle}
        textAlign="left"
        placeholder="제목을 적어주세요."
        width={inputStyles.w100p}
      />
      <Textarea
        value={content}
        onChange={onChangeContents}
        width={textareaStyles.w100p}
        placeholder="내용을 적어주세요."
      />
      <div className={styles.button_wrapper}>
        <div>
          <Button text="등록" onClick={onClickSubmit} />
        </div>
      </div>
    </main>
  );
}

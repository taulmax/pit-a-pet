import styles from "@/styles/components/form/Textarea.module.css";
import { useCallback, useState } from "react";

interface ITextarea {
  id?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number; // 최대 글자 수 추가
  reply?: boolean;
}

export default function Textarea({
  id,
  className = "",
  value,
  onChange,
  maxLength, // 기본값은 500
  reply,
}: ITextarea) {
  const [charCount, setCharCount] = useState(value.length);

  // Focus Event
  const onFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.parentElement?.classList.add(styles.active);
  }, []);

  // Blur Event
  const onBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.parentElement?.classList.remove(styles.active);
  }, []);

  // 글자 수가 변경될 때 호출되는 핸들러
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!maxLength) return onChange(e);

    const text = e.target.value;
    if (text.length <= maxLength) {
      onChange(e);
      setCharCount(text.length);
    }
  };

  return (
    <>
      <div
        className={`${styles.textarea_wrapper} ${reply ? styles.reply : ""}`}
      >
        <textarea
          className={`${styles.custom_textarea} ${className}`}
          id={id}
          value={value}
          onChange={handleTextChange}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={maxLength} // 최대 글자 수 설정
        />
      </div>
      {maxLength && (
        <div className={styles.char_count}>
          ({charCount} / {maxLength})
        </div>
      )}
    </>
  );
}

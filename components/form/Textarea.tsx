import styles from "@/styles/components/form/Textarea.module.css";
import { useCallback } from "react";

interface ITextarea {
  id?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  id,
  className = "",
  value,
  onChange,
}: ITextarea) {
  // Focus Event
  const onFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.parentElement?.classList.add(styles.active);
  }, []);

  // Blur Event
  const onBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.parentElement?.classList.remove(styles.active);
  }, []);

  return (
    <div className={styles.textarea_wrapper}>
      <textarea
        className={`${styles.custom_textarea} ${className}`}
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  );
}

import { useCallback } from "react";
import styles from "@/styles/components/form/Input.module.css";

interface IInput {
  id?: string;
  type?:
    | "text"
    | "password"
    | "checkbox"
    | "radio"
    | "file"
    | "number"
    | "time";

  textAlign?: "left" | "center" | "right";
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suffix?: string;
}

export default function Input({
  id,
  type = "text",
  className = "",
  textAlign = "center",
  value,
  onChange,
  suffix,
}: IInput) {
  // Focus Event
  const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.parentElement?.classList.add(styles.active);
  }, []);

  // Blur Event
  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.parentElement?.classList.remove(styles.active);
  }, []);

  return (
    <div className={styles.input_wrapper}>
      <input
        style={{
          textAlign,
        }}
        id={id}
        className={`${styles.custom_input} ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {suffix && <div className={styles.suffix}>{suffix}</div>}
    </div>
  );
}

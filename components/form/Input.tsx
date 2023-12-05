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
  onKeyUp?: (e: any) => void;
  onBlur?: () => void;
  suffix?: string;
  width?: string;
  placeholder?: string;
}

export default function Input({
  id,
  type = "text",
  className = "",
  textAlign = "center",
  value,
  onChange,
  onKeyUp,
  onBlur,
  suffix,
  width,
  placeholder,
}: IInput) {
  // Focus Event
  const onFocusInput = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.parentElement?.classList.add(styles.active);
  }, []);

  // Blur Event
  const onBlurInput = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.parentElement?.classList.remove(styles.active);
      if (onBlur) {
        onBlur();
      }
    },
    [onBlur]
  );

  return (
    <div className={`${styles.input_wrapper} ${width ? width : ""}`}>
      <input
        style={{
          textAlign,
        }}
        id={id}
        className={`${styles.custom_input} ${className}`}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocusInput}
        onBlur={onBlurInput}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
      />
      {suffix && <div className={styles.suffix}>{suffix}</div>}
    </div>
  );
}

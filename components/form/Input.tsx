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

  className?: string;
  value: string;
  onChange: any;
}

export default function Input({
  id,
  type = "text",
  className = "",
  value,
  onChange,
}: IInput) {
  // Input Focus Event
  const onFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.add(styles.active);
  }, []);

  // Input Blur Event
  const onBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    e.target.classList.remove(styles.active);
  }, []);

  return (
    <input
      id={id}
      className={`${styles.custom_input} ${className}`}
      type={type}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}

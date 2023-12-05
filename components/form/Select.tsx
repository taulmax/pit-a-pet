import { useCallback } from "react";
import styles from "@/styles/components/form/Select.module.css";

interface ISelect {
  id: string;
  value: string;
  option: {
    id: string;
    text: string;
    value: any;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  customDivStyle?: any;
  customSelectStyle?: any;
}

export function Select({
  id,
  value,
  option,
  onChange,
  customDivStyle,
  customSelectStyle,
}: ISelect) {
  // Focus Event
  const onFocus = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.parentElement?.classList.add(styles.active);
  }, []);

  // Blur Event
  const onBlur = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.parentElement?.classList.remove(styles.active);
  }, []);

  return (
    <div className={styles.select_wrapper} style={customDivStyle}>
      <select
        id={id}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        style={customSelectStyle}
      >
        {option.map((item) => (
          <option key={item.text} id={item.id} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
}

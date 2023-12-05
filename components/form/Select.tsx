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
}

export function Select({ id, value, option, onChange }: ISelect) {
  // Focus Event
  const onFocus = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.parentElement?.classList.add(styles.active);
  }, []);

  // Blur Event
  const onBlur = useCallback((e: React.FocusEvent<HTMLSelectElement>) => {
    e.target.parentElement?.classList.remove(styles.active);
  }, []);

  return (
    <div className={styles.select_wrapper}>
      <select
        id={id}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
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

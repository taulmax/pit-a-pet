import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "@/styles/components/form/IconSelectButton.module.css";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction } from "react";

interface IIconSelectButton {
  id: string;
  value: string | null;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  list: {
    data: string;
    name: string;
    icon: IconDefinition;
  }[];
}

export default function IconSelectButton({
  id,
  value,
  onClick,
  list,
}: IIconSelectButton) {
  return (
    <div className={styles.icon_select_button_wrapper}>
      {list.map(({ data, name, icon }) => (
        <div
          key={data}
          data-id={id}
          data-type={data}
          onClick={onClick}
          className={`${styles.icon_button} ${
            value === data ? styles.active : ""
          }`}
        >
          <FontAwesomeIcon icon={icon} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

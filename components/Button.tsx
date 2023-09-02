import styles from "@/styles/components/Button.module.css";

interface IButton {
  text: string;
  color?: string;
  className?: string;
  onClick?: (e: any) => void;
}

export default function Button({
  text,
  color = "blue",
  className = "",
  onClick,
}: IButton) {
  return (
    <button
      onClick={onClick}
      className={`${styles.my_button} ${styles[color]} ${styles[className]}`}
    >
      {text}
    </button>
  );
}

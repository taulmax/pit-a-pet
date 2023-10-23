import styles from "@/styles/components/Button.module.css";

interface IButton {
  text: string;
  color?: string;
  className?: string;
  onClick?: (e: any) => void;
  disabled?: boolean;
}

export default function Button({
  text,
  color = "blue",
  className = "",
  onClick,
  disabled = false,
}: IButton) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.my_button} ${styles[color]} ${styles[className]}`}
    >
      {text}
    </button>
  );
}

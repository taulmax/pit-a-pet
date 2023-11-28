import styles from "@/styles/components/Button.module.css";

interface IButton {
  text: string;
  color?: string;
  textColor?: string;
  className?: string;
  icon?: any;
  onClick?: (e: any) => void;
  disabled?: boolean;
}

export default function Button({
  text,
  color = "blue",
  textColor = "white",
  className = "",
  icon,
  onClick,
  disabled = false,
}: IButton) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.my_button} ${styles[color]} ${styles[className]} ${styles[textColor]}`}
    >
      {icon && icon}
      {text}
    </button>
  );
}

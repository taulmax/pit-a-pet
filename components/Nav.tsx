import styles from "@/styles/components/Nav.module.css";
import { MAIN_MENU } from "@/util/data";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const { pathname } = useRouter();
  return (
    <nav className={styles.main_nav}>
      {MAIN_MENU.map(({ title, link }) => (
        <Link
          key={title}
          className={pathname === link ? styles.current_page : ""}
          href={link}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}

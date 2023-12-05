import { useGlobalState } from "@/context/GlobalStateContext";
import styles from "@/styles/components/Nav.module.css";
import { MAIN_MENU } from "@/util/data";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const { pathname } = useRouter();
  const { isLogin } = useGlobalState();

  return (
    <nav className={styles.main_nav}>
      {MAIN_MENU.map(({ title, link }) => (
        <Link
          key={title}
          className={pathname.includes(link) ? styles.current_page : ""}
          href={link}
        >
          {title}
        </Link>
      ))}
      {isLogin && (
        <Link
          className={pathname.includes("/mypage") ? styles.current_page : ""}
          href={"/mypage"}
        >
          My Page
        </Link>
      )}
    </nav>
  );
}

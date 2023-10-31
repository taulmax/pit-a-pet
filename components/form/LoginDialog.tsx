import { RefObject, useCallback } from "react";
import styles from "@/styles/components/form/LoginDialog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { useRouter } from "next/router";

interface ILoginDialog {
  dialogRef: RefObject<HTMLDialogElement>;
}

export default function LoginDialog({ dialogRef }: ILoginDialog) {
  const router = useRouter();

  const closeModal = useCallback(() => {
    dialogRef.current?.close();
  }, [dialogRef]);

  const moveToLogin = useCallback(() => {
    router.push("/login");
  }, [router]);

  return (
    <div className={styles.dialog_wrapper}>
      <header>
        <FontAwesomeIcon icon={faX} onClick={closeModal} />
      </header>
      <div className={styles.dialog_contents}>
        <h1>로그인이 필요한 서비스에요.</h1>
        <div className={styles.description}>
          PIT-A-PET에서 더 좋은 시간을 보내고 싶으시다면, 로그인을 해주세요!
        </div>
        <Button text="로그인 하러가기" onClick={moveToLogin} />
      </div>
    </div>
  );
}

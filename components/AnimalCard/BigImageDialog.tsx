import Image from "next/image";
import { RefObject, useCallback } from "react";
import styles from "@/styles/components/BigImageDialog.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

interface IBigImageDialog {
  dialogRef: RefObject<HTMLDialogElement>;
  src: string;
}

export default function BigImageDialog({ dialogRef, src }: IBigImageDialog) {
  const closeModal = useCallback(() => {
    dialogRef.current?.close();
  }, [dialogRef]);

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  return (
    <dialog
      onClick={handleBackdropClick}
      className={styles.dialog}
      ref={dialogRef}
    >
      <Image
        className={styles.image}
        src={src}
        alt="thumbnail"
        priority={true}
        width={500}
        height={500}
      />
    </dialog>
  );
}

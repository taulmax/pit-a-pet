import React, { useCallback, useRef, useState } from "react";
import styles from "@/styles/components/form/FileUpload.module.css";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface IPreviewItem {
  file: File;
  onDelete: () => void;
}

function PreviewItem({ file, onDelete }: IPreviewItem) {
  return (
    <div className={styles.previewItem}>
      <div className={styles.thumbnail}>
        <Image
          src={URL.createObjectURL(file)}
          alt={file.name}
          width={100} // 이미지의 가로 크기를 지정합니다.
          height={100} // 이미지의 세로 크기를 지정합니다.
        />
      </div>
      <div className={styles.info}>
        <p>{file.name}</p>
        <p>{`${(file.size / 1024).toFixed(2)} KB`}</p>
      </div>
      <button className={styles.deleteButton} onClick={onDelete}>
        X
      </button>
    </div>
  );
}

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      setIsDragOver(false);

      const newFiles: File[] = Array.from(e.dataTransfer.files);

      // 현재 이미지의 개수와 추가하려는 이미지의 개수를 합산하여 5개를 넘지 않도록 처리
      if (files.length + newFiles.length <= 5) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    },
    [files, setFiles]
  );

  const onDelete = useCallback(
    (fileToDelete: File) => {
      // 파일 삭제를 처리합니다.
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file !== fileToDelete)
      );
    },
    [setFiles]
  );

  return (
    <div className={styles.upload_wrapper}>
      <label
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        htmlFor="imageUpload"
        className={`${styles.image_upload_label} ${
          isDragOver ? styles.active : ""
        }`}
      >
        <FontAwesomeIcon icon={faFileArrowUp} />
        <div className={styles.upload_text}>
          드래그 앤 드랍 혹은 클릭해주세요!
        </div>
      </label>
      <div className={styles.preivew_wrapper}>
        {files.map((file, index) => (
          <PreviewItem
            key={index}
            file={file}
            onDelete={() => onDelete(file)}
          />
        ))}
      </div>
      <input
        style={{ display: "none" }}
        type="file"
        id="imageUpload"
        name="images"
        multiple
        accept="image/*"
      />
    </div>
  );
}

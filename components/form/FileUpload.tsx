import React, { useCallback, useRef, useState } from "react";
import styles from "@/styles/components/form/FileUpload.module.css";
import { faFileArrowUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

interface IPreviewItem {
  file: File;
  onDelete: (e: any) => void;
}

function PreviewItem({ file, onDelete }: IPreviewItem) {
  const onClickPreventBubble = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  return (
    <div onClick={onClickPreventBubble} className={styles.preview_item}>
      <Image
        src={URL.createObjectURL(file)}
        alt={file.name}
        width={100} // 이미지의 가로 크기를 지정합니다.
        height={100} // 이미지의 세로 크기를 지정합니다.
      />
      <button className={styles.delete_button} onClick={onDelete}>
        <FontAwesomeIcon icon={faXmarkCircle} />
      </button>
    </div>
  );
}

export default function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      e.stopPropagation();
      setIsDragOver(false);

      const newFiles: File[] = Array.from(e.dataTransfer.files);

      // 현재 이미지의 개수와 추가하려는 이미지의 개수를 합산하여 4개를 넘지 않도록 처리
      if (files.length + newFiles.length <= 4) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    },
    [files, setFiles]
  );

  const onDelete = useCallback(
    (fileToDelete: File, e: React.MouseEvent<HTMLButtonElement>) => {
      // 파일 삭제를 처리합니다.
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file !== fileToDelete)
      );
      e.preventDefault();
      e.stopPropagation();
    },
    [setFiles]
  );

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles: File[] = Array.from(e.target.files || []);

      if (files.length + newFiles.length <= 4) {
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }

      // Clear the file input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [files, setFiles]
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
        } ${files.length > 0 ? styles.no_border : ""} ${
          files.length === 4 ? styles.limit : ""
        }`}
      >
        <div
          className={`${styles.label_blur} ${isDragOver ? styles.active : ""} ${
            files.length < 4 ? "" : styles.limit
          }`}
        >
          {files.length < 4 ? (
            <>이미지를 드랍해주세요!</>
          ) : (
            <>4장의 사진만 업로드 할 수 있어요!</>
          )}
        </div>
        <div
          className={`${styles.label_wrapper} ${
            files.length > 0 ? styles.hide : ""
          }`}
        >
          <FontAwesomeIcon icon={faFileArrowUp} />
          <div className={styles.upload_text}>
            드래그 앤 드랍 혹은 클릭해주세요!
          </div>
        </div>
        <div
          className={`${styles.preview_wrapper} ${
            files.length > 0 ? styles.show : ""
          }`}
        >
          {files.map((file, index) => (
            <PreviewItem
              key={index}
              file={file}
              onDelete={(e) => onDelete(file, e)}
            />
          ))}
          {files.length < 4 && (
            <div className={styles.fake_upload}>
              <div className={styles.fake_upload_content}>
                <FontAwesomeIcon icon={faFileArrowUp} />
              </div>
            </div>
          )}
        </div>
      </label>
      <input
        style={{ display: "none" }}
        type="file"
        id="imageUpload"
        name="images"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileInputChange}
      />
    </div>
  );
}

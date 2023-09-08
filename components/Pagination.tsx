import React from "react";
import styles from "@/styles/components/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

interface IPagination {
  currentPage: number;
  pageCount: number;
  onPageChange: any;
}

export default function Pagination({
  currentPage,
  pageCount,
  onPageChange,
}: IPagination) {
  const pageNumbers = [];
  const maxPagesToShow = 10; // 한 번에 보여줄 최대 페이지 수

  // 현재 페이지가 중간 이후에 위치하도록 계산
  let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  let endPage = startPage + maxPagesToShow - 1;

  // 보여줄 페이지 수가 pageCount를 넘지 않도록 조정
  if (endPage > pageCount) {
    endPage = pageCount;
    startPage = Math.max(pageCount - maxPagesToShow + 1, 1);
  }

  // "<<"(첫 페이지로 이동) 버튼
  if (currentPage > 1) {
    pageNumbers.push(
      <button
        key="<<"
        className={styles.page_button}
        onClick={() => onPageChange(1)}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
    );
  }

  // "<"(이전 10단위 페이지로 이동) 버튼
  if (startPage > 1) {
    pageNumbers.push(
      <button
        key="<"
        className={styles.page_button}
        onClick={() => onPageChange(startPage - 1)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
    );
  }

  // 페이지 번호 버튼
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        className={`${styles.page_button} ${
          i === currentPage ? styles.active : ""
        }`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  // ">"(다음 10단위 페이지로 이동) 버튼
  if (endPage < pageCount) {
    pageNumbers.push(
      <button
        key=">"
        className={styles.page_button}
        onClick={() => onPageChange(endPage + 1)}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    );
  }

  // ">>"(마지막 페이지로 이동) 버튼
  if (currentPage < pageCount) {
    pageNumbers.push(
      <button
        key=">>"
        className={styles.page_button}
        onClick={() => onPageChange(pageCount)}
      >
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    );
  }

  return <div className={styles.pagination}>{pageNumbers}</div>;
}

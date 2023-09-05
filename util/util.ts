export function formatDate(inputDate: string | Date) {
  let date;
  if (typeof inputDate === "string") {
    // 입력값이 "yyyyMMdd" 형식인 경우 "-"를 추가하여 "yyyy-mm-dd" 형식으로 변환
    if (/^\d{8}$/.test(inputDate)) {
      inputDate = inputDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    }
    // 문자열 형태의 날짜를 Date 객체로 변환
    date = new Date(inputDate);
  } else if (inputDate instanceof Date) {
    // 이미 Date 객체인 경우 그대로 사용
    date = inputDate;
  } else {
    throw new Error(
      "Invalid input. Input should be a string or a Date object."
    );
  }

  const yyyyYear = date.getFullYear();
  const yyYear = yyyyYear.toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 +1 해줍니다.
  const day = date.getDate().toString().padStart(2, "0");

  return {
    "yy.mm.dd": `${yyYear}.${month}.${day}`,
    "yyyy.mm.dd": `${yyyyYear}.${month}.${day}`,
    "yy-mm-dd": `${yyYear}-${month}-${day}`,
    "yyyy-mm-dd": `${yyyyYear}-${month}-${day}`,
  };
}

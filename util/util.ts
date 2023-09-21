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

export function encodeDataToBase64(data: any) {
  const textEncoder = new TextEncoder();
  const dataToEncode = JSON.stringify(data);
  const uint8Array = textEncoder.encode(dataToEncode);
  return btoa(String.fromCharCode.apply(null, Array.from(uint8Array)));
}

export function decodeBase64ToUTF8(encodedData: any) {
  const decodedData = atob(encodedData); // Base64 디코딩
  const textDecoder = new TextDecoder("utf-8");
  const utf8Data = textDecoder.decode(
    new Uint8Array(decodedData.length).map((_, i) => decodedData.charCodeAt(i))
  );
  return utf8Data;
}

export function formatNumber(value: string): string {
  // 입력된 문자열에서 숫자만 추출하여 합치고 콤마를 추가합니다.
  const numericValue = value.replace(/[^0-9]/g, "");
  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return formattedValue;
}

export function numberToKoreanAmount(numberStr: string) {
  const units = ["", "만", "억"];
  let koreanNumber = "";

  if (numberStr.length > 4) {
    const frontNumberLength = numberStr.length % 4; // 맨 앞 숫자 길이
    const frontNumber = numberStr.slice(0, frontNumberLength); // 맨 앞 숫자
    const restNumber = numberStr.slice(frontNumberLength); // 나머지 숫자
    const unitNumber = restNumber.length / 4;

    if (frontNumber) {
      koreanNumber += frontNumber + units[unitNumber] + " ";
    }
    for (let i = 0; i < unitNumber; i++) {
      const tempNumber = parseInt(restNumber.slice(4 * i, 4 * (i + 1)));
      if (tempNumber) {
        koreanNumber += tempNumber.toString() + units[unitNumber - 1 - i] + " ";
      }
    }
  } else {
    koreanNumber = numberStr;
  }

  return koreanNumber.trim();
}

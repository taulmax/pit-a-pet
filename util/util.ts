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

// 기존 코드를 Blob으로 변환하여 files 배열을 업데이트하는 함수
export function convertFilesToBlob(newFiles: File[]): Blob[] {
  const blobArray: Blob[] = [];

  newFiles.forEach(function (file: File) {
    try {
      // 파일이 유효한지 확인
      if (!file || !file.size || !file.type) {
        console.error("Invalid file:", file);
        return;
      }

      const blob: Blob = new Blob([file]);

      // Blob이 올바르게 생성되었는지 확인
      if (!blob) {
        console.error("Blob creation failed for file:", file);
        return;
      }

      blobArray.push(blob);
    } catch (error) {
      console.error("Error converting file to Blob:", error);
    }
  });

  return blobArray;
}

export function formatTimeDifference(timestamp: string): string {
  const currentTime = new Date();
  const pastTime = new Date(timestamp);
  const timeDifference = (currentTime.getTime() - pastTime.getTime()) / 1000; // 차이를 초로 계산

  if (timeDifference < 60) {
    return `${Math.floor(timeDifference)}초 전`;
  } else if (timeDifference < 3600) {
    return `${Math.floor(timeDifference / 60)}분 전`;
  } else if (timeDifference < 86400) {
    return `${Math.floor(timeDifference / 3600)}시간 전`;
  } else if (timeDifference < 604800) {
    return `${Math.floor(timeDifference / 86400)}일 전`;
  } else if (timeDifference < 2419200) {
    const weeks = Math.floor(timeDifference / 604800);
    return weeks === 1 ? "1주일 전" : `${weeks}주일 전`;
  } else if (timeDifference < 29030400) {
    const months = Math.floor(timeDifference / 2419200);
    return months === 1 ? "1개월 전" : `${months}개월 전`;
  } else {
    const years = Math.floor(timeDifference / 29030400);
    return years === 1 ? "1년 전" : `${years}년 전`;
  }
}

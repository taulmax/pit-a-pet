import { kakaoLoginCallback } from "@/api/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function KakaoLogin() {
  const router = useRouter();

  useEffect(() => {
    // 페이지 로딩 시 URL에서 'code' 파라미터를 가져와서 사용
    const { code } = router.query;

    if (code) {
      // 여기에서 code를 사용하여 필요한 작업을 수행
      console.log("Kakao Login Code:", code);

      // 예를 들어, code를 서버로 보내어 토큰을 교환하거나 다른 로직을 수행할 수 있습니다.
      kakaoLoginCallback(code as string)
        .then((response) => {
          console.log(response);
        })
        .catch((error) =>
          console.error("Error exchanging code for token:", error)
        );
    }
  }, [router.query]);

  return <></>;
}

import { kakaoLoginCallback, useLogin, useRegister } from "@/api/login";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function KakaoLogin() {
  const router = useRouter();
  const { kakaoRegister } = useRegister();
  const { loginWithCredentials } = useLogin();

  useEffect(() => {
    // 페이지 로딩 시 URL에서 'code' 파라미터를 가져와서 사용
    const { code } = router.query;

    if (code) {
      // 예를 들어, code를 서버로 보내어 토큰을 교환하거나 다른 로직을 수행할 수 있습니다.
      kakaoLoginCallback(code as string)
        .then((response) => {
          console.log(response);
          kakaoRegister({
            username: response.username,
            password: `${response.kakaoId}`,
          }).then(() =>
            loginWithCredentials({
              username: response.username,
              password: `${response.kakaoId}`,
            })
          );
        })
        .catch((error) =>
          console.error("Error exchanging code for token:", error)
        );
    }
  }, [router.query]);

  return <></>;
}

import Button from "@/components/Button";
import Input from "@/components/form/Input";
import { useCallback, useState } from "react";
import styles from "@/styles/pages/login.module.css";
import inputStyles from "@/styles/components/form/Input.module.css";
import Link from "next/link";
import { useLogin } from "@/api/login";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loginWithCredentials, isLoading } = useLogin();

  const onClickLogin = useCallback(async () => {
    loginWithCredentials({ username, password });
  }, [username, loginWithCredentials, password]);

  return (
    <div className={styles.login_page_wrapper}>
      <div className={styles.login_box}>
        <h1>PIT-A-PET</h1>
        <Input
          value={username}
          width={inputStyles.w100p}
          onChange={(e) => setUsername(e.target.value)}
          textAlign="left"
          placeholder="아이디를 입력해주세요"
        />
        <Input
          value={password}
          type="password"
          width={inputStyles.w100p}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onClickLogin();
            }
          }}
          textAlign="left"
          placeholder="비밀번호를 입력해주세요"
        />
        <div className={styles.is_auth}>
          아직 회원이 아니신가요?&nbsp;
          <span>
            <Link href="/register">회원가입 하러 가기</Link>
          </span>
        </div>
        <Button text="로그인" disabled={isLoading} onClick={onClickLogin} />
        <div className={styles.find}>
          <span>아이디 찾기</span>
          <span>&nbsp;|&nbsp;</span>
          <span>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
}

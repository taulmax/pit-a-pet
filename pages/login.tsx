import Button from "@/components/Button";
import Input from "@/components/form/Input";
import { useState } from "react";
import styles from "@/styles/pages/login.module.css";
import inputStyles from "@/styles/components/form/Input.module.css";
import Link from "next/link";

export default function Login() {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  return (
    <div className={styles.login_page_wrapper}>
      <div className={styles.login_box}>
        <h1>PIT-A-PET</h1>
        <Input
          value={id}
          width={inputStyles.w100p}
          onChange={(e) => setId(e.target.value)}
          textAlign="left"
          placeholder="아이디를 입력해주세요"
        />
        <Input
          value={pw}
          type="password"
          width={inputStyles.w100p}
          onChange={(e) => setPw(e.target.value)}
          textAlign="left"
          placeholder="비밀번호를 입력해주세요"
        />
        <div className={styles.is_auth}>
          아직 회원이 아니신가요?&nbsp;
          <span>
            <Link href="/register">회원가입 하러 가기</Link>
          </span>
        </div>
        <Button text="로그인" />
        <div className={styles.find}>
          <span>아이디 찾기</span>
          <span>&nbsp;|&nbsp;</span>
          <span>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
}

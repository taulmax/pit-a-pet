import Button from "@/components/Button";
import Input from "@/components/form/Input";
import { useCallback, useState } from "react";
import styles from "@/styles/pages/login.module.css";
import inputStyles from "@/styles/components/form/Input.module.css";
import { useRedundancy, useRegister } from "@/api/login";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean | null>(null);

  const [isRedundancy, setIsRedundancy] = useState<null | "Y" | "N" | "void">(
    null
  );

  const { checkRedundancy } = useRedundancy();
  const { register } = useRegister();

  const onBlurCheckRedundancy = useCallback(async () => {
    if (username) {
      const response = await checkRedundancy({ username });
      if (response === "아이디가 중복 되었습니다.") {
        setIsRedundancy("Y");
      } else {
        setIsRedundancy("N");
      }
    } else {
      setIsRedundancy("void");
    }
  }, [checkRedundancy, username]);

  const onChangeCheckPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordCheck(e.target.value);
      if (password === e.target.value) {
        setIsPasswordSame(true);
      } else {
        setIsPasswordSame(false);
      }
    },
    [password]
  );

  const onClickRegister = useCallback(() => {
    if (!username) {
      return toast.error("아이디를 입력해주세요.");
    } else if (isRedundancy === "Y") {
      return toast.error("아이디가 중복되었어요.");
    } else if (!password) {
      return toast.error("비밀번호를 입력해주세요.");
    } else if (!passwordCheck) {
      return toast.error("비밀번호 확인을 입력해주세요.");
    } else if (!isPasswordSame) {
      return toast.error("비밀번호가 일치하지 않아요.");
    } else {
      register({ username, password });
    }
  }, [
    isPasswordSame,
    isRedundancy,
    password,
    passwordCheck,
    register,
    username,
  ]);

  return (
    <div className={styles.login_page_wrapper}>
      <div className={styles.login_box}>
        <h1>PIT-A-PET과 함께해요!</h1>
        <Input
          value={username}
          width={inputStyles.w100p}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={onBlurCheckRedundancy}
          textAlign="left"
          placeholder="아이디를 입력해주세요"
        />
        {isRedundancy &&
          (isRedundancy === "Y" ? (
            <div className={`${styles.is_auth} ${styles.red}`}>
              중복된 아이디입니다.
            </div>
          ) : isRedundancy === "N" ? (
            <div className={`${styles.is_auth} ${styles.green}`}>
              사용 가능한 아이디입니다.
            </div>
          ) : (
            <></>
          ))}
        <Input
          value={password}
          type="password"
          width={inputStyles.w100p}
          onChange={(e) => setPassword(e.target.value)}
          textAlign="left"
          placeholder="비밀번호를 입력해주세요"
        />
        <Input
          value={passwordCheck}
          type="password"
          width={inputStyles.w100p}
          onChange={onChangeCheckPassword}
          textAlign="left"
          placeholder="비밀번호를 한번 더 입력해주세요"
        />
        {isPasswordSame !== null ? (
          isPasswordSame ? (
            <div className={`${styles.is_auth} ${styles.green}`}>
              비밀번호가 일치합니다.
            </div>
          ) : (
            <div className={`${styles.is_auth} ${styles.red}`}>
              입력하신 비밀번호와 불일치 합니다.
            </div>
          )
        ) : (
          <div className={styles.is_auth}></div>
        )}
        <Button text="회원가입" onClick={onClickRegister} />
      </div>
    </div>
  );
}

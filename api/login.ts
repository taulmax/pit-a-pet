import { useMutation } from "react-query";
import axios from "./axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/GlobalStateContext";

export interface IUseLogin {
  username: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const { setIsLogin } = useGlobalState();
  const login = useMutation(loginUser);

  async function loginUser({ username, password }: IUseLogin) {
    const response = await axios.post("/auth/login", { username, password });
    return response.data;
  }

  const loginWithCredentials = async (credentials: IUseLogin) => {
    try {
      const response = await login.mutateAsync(credentials);
      router.push("/");
      setIsLogin(true);
      localStorage.setItem("token", response.access_token);
      console.log("로그인 성공");
    } catch (error) {
      console.error("로그인 실패:", error);
      toast.error("로그인에 실패했어요.");
    }
  };

  return { loginWithCredentials, isLoading: login.isLoading };
};

// 우리 아이 찾기 GET
export const getMyPage = async (): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const response = await axios.get("/mypage", { headers });
  return response.data;
};

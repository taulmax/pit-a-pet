import { useMutation } from "react-query";
import axios from "./axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export interface IUseLogin {
  username: string;
  password: string;
}

export const useLogin = () => {
  const router = useRouter();
  const login = useMutation(loginUser);

  async function loginUser({ username, password }: IUseLogin) {
    const response = await axios.post("/auth/login", { username, password });
    return response.data;
  }

  const loginWithCredentials = async (credentials: IUseLogin) => {
    try {
      const response = await login.mutateAsync(credentials);
      router.push("/");
      localStorage.setItem("token", response.access_token);
    } catch (error) {
      console.error("로그인 실패:", error);
      toast.error("로그인에 실패했어요.");
    }
  };

  return { loginWithCredentials, isLoading: login.isLoading };
};

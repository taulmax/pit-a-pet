import { useMutation } from "react-query";
import axios from "./axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useGlobalState } from "@/context/GlobalStateContext";

export interface IUseLogin {
  username: string;
  password: string;
}

export interface IUseRegister {
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

export const useRedundancy = () => {
  const checkRedundancyMutation = useMutation(postCheckRedundancy);
  const registerMutation = useMutation(postRegister);

  async function postCheckRedundancy({ username }: { username: string }) {
    const response = await axios.post("/auth/checkRedundancy", { username });
    return response.data;
  }

  async function postRegister({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const response = await axios.post("/auth/register", { username, password });
    return response.data;
  }

  const checkRedundancy = async (redundancyData: { username: string }) => {
    try {
      const response = await checkRedundancyMutation.mutateAsync(
        redundancyData
      );
      return response;
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
    }
  };

  const register = async (registerData: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await registerMutation.mutateAsync(registerData);
      toast.error("회원가입에 성공했어요!");
      return response;
    } catch (error) {
      console.error("회원가입 실패:", error);
      toast.error("회원가입에 실패했어요.");
    }
  };

  return { checkRedundancy, register };
};

export const useRegister = () => {
  const router = useRouter();
  const registerMutation = useMutation(postRegister);

  async function postRegister({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const response = await axios.post("/auth/register", { username, password });
    return response.data;
  }

  const register = async (registerData: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await registerMutation.mutateAsync(registerData);
      router.push("/login");
      toast.success("회원가입에 성공했어요!");
      return response;
    } catch (error) {
      console.error("회원가입 실패:", error);
      toast.error("회원가입에 실패했어요.");
    }
  };

  return { register };
};

// 우리 아이 찾기 GET
export const getMyPage = async (): Promise<any> => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const response = await axios.get("/mypage", { headers });
  return response.data;
};

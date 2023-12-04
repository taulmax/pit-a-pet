import { IdleData } from "@/api/introduction";
import { getMyPage } from "@/api/login";
import { LostData } from "@/api/lost";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";

interface GlobalState {
  // 로그인
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;

  // 아이들 소개 상세보기
  idleDetail: IdleData | null;
  setIdleDetail: Dispatch<SetStateAction<IdleData | null>>;
  resetIdleDetail: () => void;

  // 실종 신고 상세보기
  lostDetail: LostData | null;
  setLostDetail: Dispatch<SetStateAction<LostData | null>>;
  resetLostDetail: () => void;

  // 마이페이지 데이터
  myPageData: any;
  setMyPageData: Dispatch<SetStateAction<null>>;
  resetMyPageData: () => void;

  // 스토리 업데이트
  story: null | { post_id: number; title: string; content: string };
  setStory: Dispatch<
    SetStateAction<{
      post_id: number;
      title: string;
      content: string;
    } | null>
  >;
  resetStory: () => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

type GlobalStateProviderProps = {
  children: ReactNode;
};

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const [idleDetail, setIdleDetail] = useState<IdleData | null>(null);
  const resetIdleDetail = () => setIdleDetail(null);

  const [lostDetail, setLostDetail] = useState<LostData | null>(null);
  const resetLostDetail = () => setLostDetail(null);

  const [myPageData, setMyPageData] = useState(null);
  const resetMyPageData = () => setMyPageData(null);

  const [story, setStory] = useState<null | {
    post_id: number;
    title: string;
    content: string;
  }>(null);
  const resetStory = () => setStory(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      if (token) {
        setIsLogin(true);
        try {
          const myPageResponse = await getMyPage();
          setMyPageData(myPageResponse);
          console.log(myPageResponse);
        } catch (error) {
          console.error("Error fetching my page:", error);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        isLogin,
        setIsLogin,
        idleDetail,
        setIdleDetail,
        resetIdleDetail,
        lostDetail,
        setLostDetail,
        resetLostDetail,
        myPageData,
        setMyPageData,
        resetMyPageData,
        story,
        setStory,
        resetStory,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

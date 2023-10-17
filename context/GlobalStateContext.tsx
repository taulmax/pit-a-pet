import { IdleData } from "@/api/introduction";
import { LostData } from "@/api/lost";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface GlobalState {
  // 아이들 소개 상세보기
  idleDetail: IdleData | null;
  setIdleDetail: Dispatch<SetStateAction<IdleData | null>>;
  resetIdleDetail: () => void;

  // 실종 신고 상세보기
  lostDetail: LostData | null;
  setLostDetail: Dispatch<SetStateAction<LostData | null>>;
  resetLostDetail: () => void;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

type GlobalStateProviderProps = {
  children: ReactNode;
};

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [idleDetail, setIdleDetail] = useState<IdleData | null>(null);
  const resetIdleDetail = () => setIdleDetail(null);

  const [lostDetail, setLostDetail] = useState<LostData | null>(null);
  const resetLostDetail = () => setLostDetail(null);

  return (
    <GlobalStateContext.Provider
      value={{
        idleDetail,
        setIdleDetail,
        resetIdleDetail,
        lostDetail,
        setLostDetail,
        resetLostDetail,
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

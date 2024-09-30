import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type UserInfo = {
  isAuthenticated: boolean;
  id: string | null;
  username: string | null;
};

type UserContextType = {
  userInfo: UserInfo;
  login: (id: string, username: string) => void;
  logout: () => void;
  tokenJwt: string | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    isAuthenticated: false,
    id: null,
    username: null,
  });
  const [tokenJwt, setTokenJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  const login = (id: string, username: string) => {
    const user = {
      isAuthenticated: true,
      id,
      username,
    };
    setUserInfo(user);

    const token = localStorage.getItem("token");
    if (token) {
      setTokenJwt(token);
    }

    localStorage.setItem("userData", JSON.stringify(user));
  };

  const logout = () => {
    setUserInfo({
      isAuthenticated: false,
      id: null,
      username: null,
    });
    setTokenJwt(null);
    localStorage.clear();
  };

  useEffect(() => {
    const userFromStorage = localStorage.getItem("userData");
    const tokenFromStorage = localStorage.getItem("token");

    if (userFromStorage && tokenFromStorage) {
      const user = JSON.parse(userFromStorage);
      setUserInfo({
        isAuthenticated: true,
        id: user.id,
        username: user.username,
      });
      setTokenJwt(tokenFromStorage);
    } else {
      logout();
    }

    setLoading(false); // Khi hoàn tất kiểm tra, đặt loading thành false
  }, []);

  return (
    <UserContext.Provider
      value={{ userInfo, login, logout, tokenJwt, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

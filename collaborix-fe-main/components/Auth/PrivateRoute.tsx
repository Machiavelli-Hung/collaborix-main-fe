import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
//import { UserContext } from "../contexts/AuthContext"; // Đường dẫn tới UserContext
import { useUser } from "../../context/Provider";
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { userInfo, login, logout, loading } = useUser();

  useEffect(() => {
    if (!loading && !userInfo.isAuthenticated) {
      router.push("/login"); // Chuyển hướng đến trang đăng nhập nếu chưa xác thực
    }
  }, [loading, userInfo.isAuthenticated, router]);
  if (loading) {
    return <div>Loading...</div>; // Hiển thị trang loading khi kiểm tra xác thực
  }
  return userInfo.isAuthenticated ? children : null;
};

export default PrivateRoute;

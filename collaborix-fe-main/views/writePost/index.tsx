import WritePost from "../../components/Public/WritePost/index";
import Navbar from "../../components/Public/Layout/Navbar";
import PrivateRoute from "../../components/Auth/PrivateRoute";
const LayoutPageWritePost = () => {
  return (
    <PrivateRoute>
      <div className="bg-white size-full pt-12 pb-28">
        <Navbar />
        <WritePost />
      </div>
    </PrivateRoute>
  );
};
export default LayoutPageWritePost;

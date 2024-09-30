import { NextPage } from "next";
// import LoginFunction from "../components/Public/login";
import PrivateRoute from "../../components/Auth/PrivateRoute";
import IntroView from "./index";
import Navbar from "../../components/Public/Layout/Navbar";
import NewFeed from "../../components/Public/Post/index";
import Layout from "../../components/Public/Layout";
const PageView: NextPage = () => {
  return (
    <PrivateRoute>
      <>
        <Layout>
          <NewFeed key="1" />
          {/* // <IntroView key="1" /> */}
        </Layout>
      </>
    </PrivateRoute>
  );
};
export default PageView;

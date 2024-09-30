import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });
import ViewPage from "../views/page/index";
import PrivateRoute from "../components/Auth/PrivateRoute";
import type { NextPage } from "next";
const View: NextPage = () => {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Social reivew</title>
        <meta content="Slide" name="description" />
        <link
          href={
            "https://i.ibb.co/DzGyR93/photo-2024-03-05-15-59-01-modified.png"
          }
          rel="icon"
        />
      </Head>
      <main>
        <ViewPage />
      </main>
    </div>
  );
};

export default View;

import React, { memo } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import Social from "../Social/Social";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}
      <Social />
      <Footer />
    </>
  );
};

export default memo(Layout);

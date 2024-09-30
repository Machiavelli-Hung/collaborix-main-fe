// components/Navbar.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { useUser } from "../../../context/Provider";
import { useRouter } from "next/router";

import { Link } from "@nextui-org/react";
import { Button } from "antd";
import Notification from "../Notification";
const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: linear-gradient(45deg, #6b6b6b, #9b9b9b);
`;

const Logo = styled.a`
  font-size: 1.5rem;
  color: #fff;
  text-decoration: none;
`;

const SearchBox = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  margin-right: 800px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #fff;
  color: #333;
  cursor: pointer;

  &:hover {
    background: #ddd;
  }
`;
interface notifyState {
  contentNotify: string;
}
const Navbar: React.FC = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const username = "Hung";
  const router = useRouter();
  const { userInfo, login, logout } = useUser();
  const { notify, setNotify } = useState<notifyState | null>();
  useEffect(() => {
    console.log("userInfo.isAuthenticated", userInfo.isAuthenticated);
    if (userInfo.isAuthenticated === false) {
      router.push("/login");
    }
  }, [userInfo.isAuthenticated]);
  return (
    <NavbarContainer>
      <Logo href="#">Logo</Logo>
      <SearchBox type="text" placeholder="Search..." />
      <NavLinks>
        <Link href="/writepost">WritePost</Link>
        <a href="#link2">Link 2</a>
        <a href="#link3">Link 3</a>
        {userInfo.isAuthenticated === true ? (
          <>
            <span>{userInfo.username}</span>
            <Notification />
            <LoginButton onClick={() => logout()}>Logout</LoginButton>
          </>
        ) : (
          <>
            <LoginButton>ơ bug r</LoginButton>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

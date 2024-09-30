// pages/login.js

import React from "react";
import styled from "styled-components";
import { Input, Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { Magic } from "magic-sdk";
import { OAuthExtension } from "@magic-ext/oauth2";

// let apiKeyMagic = process.env.NEXT_PUBLIC_PUBLISHABLE_API_KEY_MAGIC || "";
// let magicAuth;
// let magicOauth;
// if (typeof window !== "undefined") {
//   magicAuth = new Magic(apiKeyMagic);
//   magicOauth = new Magic(apiKeyMagic, {
//     extensions: [new OAuthExtension()],
//   });
// }
// magicOauth = new Magic(apiKeyMagic, {
//   extensions: [new OAuthExtension()],
// });
//console.log("check magicOauth", magicOauth);
const handleContinue = async () => {
  // try {
  //   let res;
  //   res = await magicAuth.auth.loginWithEmailOTP({
  //     email: "xuatkich2423@gmail.com",
  //     showUI: true,
  //   });
  //   console.log("check res", res);
  // } catch {
  //   alert("Something wrong.Try again!");
  // }
};

const continueWithOauthLogin = async () => {
  // await magicOauth.oauth2.loginWithRedirect({
  //   provider: "google" /* 'google', 'facebook', 'apple', etc. */,
  //   redirectURI: "http://localhost:3000/",
  //   scope: ["email", "profile"] /* optional */,
  // });
};
const LoginPage = () => {
  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <InputContainer>
          <Input placeholder="Email" style={{ width: "70%" }} />
          <Button type="primary" onClick={() => handleContinue()}>
            Continue
          </Button>
        </InputContainer>
        <SignInBox onClick={() => continueWithOauthLogin()}>
          <GoogleSignIn>
            <GoogleOutlined style={{ marginRight: "8px" }} />
            Sign in with Google
          </GoogleSignIn>
          <QuickSignIn>Quick Sign In</QuickSignIn>
        </SignInBox>
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SignInBox = styled.div`
  background-color: #e3f2fd; /* Standout color */
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const GoogleSignIn = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 5px;
  font-weight: bold;
  color: #4285f4;
  &:hover {
    transform: scale(1.05); /* Enlarge slightly on hover */
    transition: transform 0.2s ease;
  }
`;

const QuickSignIn = styled.p`
  color: #555;
  font-size: 14px;
`;

export default LoginPage;

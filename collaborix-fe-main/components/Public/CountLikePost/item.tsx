// components/Post.js
import React, { useEffect, memo, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";

interface LikeItemProperty {
  liker: string;
  liking: string;
  username: string;
}

const ItemLike: React.FC<LikeItemProperty> = ({ liker, liking, username }) => {
  const handleCheckProfileUser = (userId: string) => {
    // Call API to get proFile this user HERE
    alert(`Hello! this function work for display this user ${userId} profile.`);
  };
  return (
    <>
      <Button onClick={() => handleCheckProfileUser(liker)}>
        {username} like this post
       
      </Button>
    </>
  );
};

export default memo(ItemLike);

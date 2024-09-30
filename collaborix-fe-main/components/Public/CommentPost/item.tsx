// components/Post.js
import React, { useEffect, memo, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";

interface CommentItem {
  userId: string;
  postId: string;
  username: string;
  commentContent: string;
}

const CommentItem: React.FC<CommentItem> = ({
  userId,
  postId,
  username,
  commentContent,
}) => {
  const handleCheckProfileUser = (userId: string) => {
    // Call API to get proFile this user HERE
    alert(`Hello! this function work for display this user ${userId} profile.`);
  };
  return (
    <>
      <Button onClick={() => handleCheckProfileUser(userId)}>
        {username} was comment :
      </Button>
      <span key={postId}>{commentContent}</span>
    </>
  );
};

export default memo(CommentItem);

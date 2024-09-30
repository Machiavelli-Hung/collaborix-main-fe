// components/Post.js
import React, { useEffect, memo, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";

import { userLikePostId, userCommentPost } from "../../../api/userApi";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver ";
import { useSocket } from "../../../context/SocketProvider";

const PostContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  background-color: #fff;
`;

const Image = styled.img`
  max-width: 100%;
  border-radius: 8px;
`;

const Content = styled.p`
  font-size: 16px;
  color: #333;
  margin: 8px 0;
`;

const ContentEditor = styled.div`
  font-size: 14px;
  color: #666;
  margin: 4px 0;
`;

const Hashtag = styled.span`
  display: inline-block;
  background-color: #e1ecf4;
  color: #0366d6;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 4px 4px 0 0;
  font-size: 14px;
`;
const CommentBox = styled.input`
  background-color: blue;
`;
interface ImageNames {
  imageName: string;
}
interface ItemProps {
  username: string | null;
  hashtag: string | null;
  postId: string;
  content: string | null;
  contentEditor: string | null;
  status: string | null;
  images?: ImageNames[]; // Prop này là tùy chọn vì trong một số trường hợp có thể không có hình ảnh
}
const Items: React.FC<ItemProps> = ({
  username,
  hashtag,
  postId,
  content,
  contentEditor,
  status,
  images,
}) => {
  const [commentContent, setCommentContent] = useState<string>("");
  const { socketInstance } = useSocket();
  //let setPostId = new Set();
  // const { observe } = useIntersectionObserver(
  //   (observedPostId) => {
  //     console.log("observedPostId", observedPostId);
  //     if (socketInstance && observedPostId) {
  //       socketInstance.emit("event", observedPostId);
  //       console.log("postId check", observedPostId);
  //     }
  //   },
  //   {
  //     threshold: 1.0,
  //   }
  // );
  // useEffect(() => {
  //   const element = document.getElementById(postId);
  //   console.log("xem element", element);
  //   setPostId.add(postId);
  //   if (element) {
  //     console.log("Observeing element with postId", postId);
  //     observe(element);
  //   }
  // }, []);
  const handleLikePost = async (postId: string) => {
    let res;
    if (postId) {
      res = await userLikePostId(postId);
    }
  };

  const handleCheck = (images: ImageNames[] | []) => {
    console.log("check array", images);
  };
  const handleCommentPost = async (postId) => {
    let resData = await userCommentPost(postId, commentContent);
    if (resData) {
      console.log("userCommentPost", resData);
    }
  };
  // socketInstance?.on("update_like_realtime", (postIdHaveNewNumberOfLike) => {
  //   console.log(
  //     " 123There is a post have new update in like number",
  //     postIdHaveNewNumberOfLike
  //   );
  // });
  return (
    <div id={postId} data-post-id={postId} style={{ marginBottom: "20px" }}>
      <h3>{username ? username : "Anonymous"}</h3>
      <p>{`Hashtag: ${hashtag ? hashtag : "No hashtag"}`}</p>
      <p>{`Post ID: ${postId}`}</p>
      <div className="content">
        <p>{content}</p>
        <div dangerouslySetInnerHTML={{ __html: contentEditor || "" }} />
      </div>
      <p>{`Status: ${status}`}</p>
      {images && images.length > 0 && (
        <div className="images">
          {images.map((image, index) => (
            <>
              ;
              <div className="flex">
                <Image
                  key={index}
                  src={
                    `http://${process.env.NEXT_PUBLIC_IP_REMOTE_SERVER}:8000/static/images/` +
                    image.imageName
                  }
                  alt={`Image ${index + 1}`}
                />
              </div>
            </>

            // />
          ))}
        </div>
      )}

      <div>Write comment bellow </div>
      <CommentBox
        placeholder="comment"
        onChange={(e) => setCommentContent(e.target.value)}
      ></CommentBox>
      <Button type="primary" onClick={() => handleCommentPost(postId)}>
        Submit
      </Button>
      <Button type="primary" onClick={() => handleLikePost(postId || "")}>
        Like
      </Button>
      <Button type="primary" onClick={() => handleCheck(images || [])}>
        Check Images
      </Button>
    </div>
  );
};

export default memo(Items);

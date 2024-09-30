import React, { useState, useEffect } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { useSocket } from "../../../context/SocketProvider";
import { getNewNumberOfLikeInEachPost } from "../../../api/userApi";
import ItemLike from "./item";

const Container = styled.div`
  border-radius: 1px solid blue;
  margin-bottom: 10px;
`;

interface LikeItem {
  liker: string;
  username: string;
  liking: string;
}

interface LikeState {
  like?: LikeItem[];
  countLike: string | null;
  postId: string | null;
}

const Like: React.FC<LikeState> = ({ like, countLike, postId }) => {
  const [countLikeOfPost, setCountLikeOfPost] = useState<string | null>(countLike);
  const [likeData, setLikeData] = useState<LikeItem[] | undefined>(like);
  const { socketInstance } = useSocket();

  useEffect(() => {
    if (socketInstance) {
      const handleLikeUpdate = async (postIdHaveNewNumberOfLike: string) => {
        console.log("there need update", postIdHaveNewNumberOfLike);
        if (postIdHaveNewNumberOfLike === postId) {
          let statusCallApiCountLikeOfPost = await getNewNumberOfLikeInEachPost(postId as string | null);
          if (statusCallApiCountLikeOfPost) {
            console.log("check statusCallApiCountLikeOfPost", statusCallApiCountLikeOfPost.data.DT);
            setCountLikeOfPost(statusCallApiCountLikeOfPost.data.DT.length);
            setLikeData(statusCallApiCountLikeOfPost.data.DT);
          }
        } else {
          console.log("dont call api from this post");
        }
      };

      socketInstance.on("update_like_realtime", handleLikeUpdate);

      // Cleanup function to remove event listener when component unmounts
      return () => {
        socketInstance.off("update_like_realtime", handleLikeUpdate);
      };
    }
  }, [socketInstance, postId]);

  return (
    <Container>
      <Button>there is {countLikeOfPost} people like this post</Button>
      {likeData && likeData.length !== 0 && (
        <div className="comment-item">
          {likeData.map((element) => (
            <ItemLike
              key={element.liker} // Add a unique key for each item
              liker={element.liker}
              liking={element.liking}
              username={element.username}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default Like;

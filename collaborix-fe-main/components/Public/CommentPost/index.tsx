import React, { memo, useEffect, useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import CommentItem from "./item";
import { useSocket } from "../../../context/SocketProvider";
import { getNewContentCommentOfPost } from "../../../api/userApi";
const Container = styled.div`
  border-radius: 1px solid blue;
  margin-bottom: 10px;
`;
interface CommentItem {
  userId: string;
  postId: string;
  username: string;
  contentComment: string;
}
interface ItemCommentProps {
  postId: string;
  comment?: CommentItem[];
}
const Comment: React.FC<ItemCommentProps> = ({ comment, postId }) => {
  const { socketInstance } = useSocket();
  const [commentState, setCommentState] = useState<CommentItem[] | undefined>(
    comment
  );
  useEffect(() => {
    if (socketInstance) {
      const handleCommentUpdate = async (postIdHaveNewComment: string) => {
        console.log("there need update", postIdHaveNewComment);
        if (postIdHaveNewComment === postId) {
          let statusCallApi = await getNewContentCommentOfPost(
            postId as string | null
          );
          if (statusCallApi) {
            console.log(
              "check statusCallApiCountLikeOfPost",
              statusCallApi.data.DT
            );
            setCommentState(statusCallApi.data.DT);
          }
        } else {
          console.log("dont call api from this post");
        }
      };

      socketInstance.on("update_comment_realtime", handleCommentUpdate);

      // Cleanup function to remove event listener when component unmounts
      return () => {
        socketInstance.off("update_comment_realtime", handleCommentUpdate);
      };
    }
  }, [socketInstance, postId]);

  return (
    <Container>
      {commentState && commentState.length !== 0 && (
        <div className="comment-item">
          {commentState.map((element) => {
          
            return (
              <>
                <CommentItem
                  userId={element.userId}
                  postId={element.postId}
                  username={element.username}
                  commentContent={element.contentComment}
                />
              </>
            );
          })}
        </div>
      )}
    </Container>
  );
};
export default Comment;

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Items from "./item";

import {
  getUserListPost,
  getUserDataWithPost,
  fetchMorePost,
  fetchNumberLikeEachPost,
} from "../../../api/userApi";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver ";
import Comment from "../CommentPost/index";
import { useSocket } from "../../../context/SocketProvider";
import Like from "../CountLikePost";
const Section = styled.section`
  min-height: 80vh;
  justify-content: center;
  align-items: center;
`;
const ScrollContainer = styled.div`
  width: 300px; /* Chiều rộng cố định */
  height: 400px; /* Chiều cao cố định */
  overflow-y: auto; /* Cho phép cuộn dọc */
  overflow-x: hidden; /* Ẩn cuộn ngang nếu cần */
  border: 1px solid #ccc; /* Tùy chọn: Thêm viền để dễ nhìn thấy */
  padding: 10px; /* Tùy chọn: Thêm khoảng cách bên trong */
`;
const Content = styled.div`
  /* Nội dung bên trong khu vực cuộn */
  line-height: 1.5;
`;
interface ImageNames {
  imageName: string;
}
interface Comments {
  userId: string;
  contentComment: string;
  username: string;
  postId: string;
}
interface Likes {
  liker: string;
  username: string;
  liking: string;
}
interface Post {
  username: string | null;
  hashtag: string | null;
  posts_data_id: string;
  content: string | null;
  contentEditor: string | null;
  status: string | null;
  summary: string | null;
  images: ImageNames[]; // Array chứa các object có thuộc tính imageName
  comments: Comments[];
  likers: Likes[];
  countLike: string | null;
}
const NewFeed = () => {
  // TỨC LÀ CỨ NGHE SỰ KIỆN ĐÃ , RỒI CÓ EMIT VÀO CHO SERVER THÌ SERVER KHÁC EMIT RA CHO
  const {
    socketInstance,
    triggerEventLogin,
    sendPostIdToServer,
    RegisterTolistenRealtimeLikeDataFromServer,
    RegisterTolistenRealtimeCommentDataFromServer,
  } = useSocket();
  const [post, setPost] = useState<Post[]>([]);

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const hasFetchedPosts = useRef(false);
  let didInit = false;
  let setPostId = new Set();
  const mySetRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!didInit) {
      console.log("oke da chay");
      triggerEventLogin();
      RegisterTolistenRealtimeLikeDataFromServer();
      RegisterTolistenRealtimeCommentDataFromServer();
      didInit = true;
    }
  }, []);
  useEffect(() => {
    const getListPost = async () => {
      if (hasFetchedPosts.current) return;
      hasFetchedPosts.current = true;
      let resData = await getUserListPost();
      // console.log("check res data123", resData.data.DT);
      let postData: Post[] = [];

      if (resData.data.DT && resData.data.DT.length > 0) {
        postData = resData.data.DT;
        console.log("postData", postData);
        //  console.log("check postData", postData);
      }
      setPost((prevPost) => [...prevPost, ...postData]);
    };
    getListPost();
  }, []);
  useEffect(() => {
    post.map((element) => {
      mySetRef.current.add(element.posts_data_id);
    });
  }, [post]);
  useEffect(() => {
    console.log("check post", post);
    post.map((element) => {
      let id = element.posts_data_id;
      mySetRef.current.add(id);
    });
  }, [post]);

  // useEffect(() => {
  //   //console.log("check post ", post);
  //   // post.map((ele) => {
  //   //  // console.log("12", ele);
  //   // });
  // }, [post]);
  // const displayMorePost = useCallback(async () => {
  //   let arrPostIdHasSeen = new FormData();

  //   let uniqueArray = [...new Set(postIdHasSeen)];

  //   console.log(uniqueArray); // [1, 2, 3, 4]

  //   uniqueArray.forEach((el) => {
  //     if (el !== "") {
  //       arrPostIdHasSeen.append("postId", el);
  //     }
  //   });

  //   let resDataMorePost = await fetchMorePost(arrPostIdHasSeen);
  //   console.log("check resDataMorePost", resDataMorePost);
  //   const id = resDataMorePost.data.DT.fullPostContent.map(
  //     (obj) => obj?.posts_data_id || ""
  //   );
  //   setPostIdHasSeen((prevIds) => [...prevIds, ...id]);
  //   uniqueArray = [...new Set(postIdHasSeen)];
  //   uniqueArray.forEach((el) => {
  //     if (el !== "") {
  //       arrPostIdHasSeen.append("postId", el);
  //     }
  //   });
  //   console.log("check resData123", resDataMorePost);
  //   let arr1 = resDataMorePost.data.DT.fullPostContent;
  //   let arr2 = resDataMorePost.data.DT.fullPostImage;
  //   let flatArr1 = arr1.flat();
  //   let flatArr2 = arr2.flat();

  //   const mergedArray = flatArr1.map((item1) => {
  //     let matchingItem = flatArr2.find(
  //       (item2) => item2 && item1 && item2.imageId === item1.posts_data_id
  //     );
  //     return {
  //       ...item1,
  //       ...matchingItem,
  //       imageId: matchingItem ? matchingItem.imageId : null,
  //     };
  //   });
  //   console.log("check mergred12", mergedArray);
  //   if (resDataMorePost.data.length < 10) {
  //     setHasMore(false);
  //   }
  //   if (resDataMorePost.data.length > 0) {
  //     setPost((prevPosts) => [...prevPosts, ...resDataMorePost.data]);
  //   }

  //   setOffset((prevOffset) => prevOffset + resDataMorePost.data.length);
  // }, [postIdHasSeen]);

  // const handleScroll = useCallback(() => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.offsetHeight - 1 &&
  //     hasMore
  //   ) {
  //     displayMorePost();
  //   }
  // }, [hasMore, displayMorePost]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);
  // const displayMorePost = async () => {
  //   let FormdataPostIdSaw = new FormData();
  //   if (postIdHasSeen) {
  //     postIdHasSeen.map((e) => {
  //       FormdataPostIdSaw.append("postId", e);
  //     });
  //   }
  //   if (FormdataPostIdSaw) {
  //     let morePostData = await fetchMorePost(FormdataPostIdSaw);
  //     console.log("morePostData", morePostData);
  //     if (
  //       morePostData.data.DT.fullPostContent &&
  //       morePostData.data.DT.fullPostContent.length > 0
  //     ) {
  //       let arr1 = morePostData.data.DT.fullPostContent;
  //       let arr2 = morePostData.data.DT.fullPostImage;
  //       let flatArr1 = arr1.flat();
  //       let flatArr2 = arr2.flat();

  //       const mergedArray1 = flatArr1.map((item1: any) => {
  //         let matchingItem = flatArr2.find(
  //           (item2: any) =>
  //             item2 && item1 && item2.imageId === item1.posts_data_id
  //         );
  //         return {
  //           ...item1,
  //           ...matchingItem,
  //           imageId: matchingItem ? matchingItem.imageId : null,
  //         };
  //       });
  //       setPost((prevPost) => [...prevPost, ...mergedArray1]);
  //       let arrPostId1 = mergedArray1.map((obj) => obj.posts_data_id);

  //       console.log("check arrPostId", arrPostId1);
  //       setPostIdHasSeen((prevPostIdHasSeen) => [
  //         ...prevPostIdHasSeen,
  //         arrPostId1,
  //       ]);
  //       console.log("mergedArray1", mergedArray1);
  //     } else {
  //       setHasMore(false);
  //     }
  //   }
  //   console.log("postIdHasSeen", postIdHasSeen);
  //   console.log("check FormdataPostIdSaw", FormdataPostIdSaw);
  // };
  // const displayMorePost = async (): Promise<void> => {
  //   let FormdataPostIdSaw = new FormData();
  //   if (postIdHasSeen) {
  //     postIdHasSeen.forEach((e) => {
  //       FormdataPostIdSaw.append("postId", e);
  //     });
  //   }

  //   if (FormdataPostIdSaw) {
  //     let morePostData = await fetchMorePost(FormdataPostIdSaw);
  //     console.log("morePostData", morePostData);

  //     if (
  //       morePostData.data.DT.fullPostContent &&
  //       morePostData.data.DT.fullPostContent.length > 0
  //     ) {
  //       let arr1: any[] = morePostData.data.DT.fullPostContent;
  //       let arr2: any[] = morePostData.data.DT.fullPostImage;
  //       let flatArr1: any[] = arr1.flat();
  //       let flatArr2: any[] = arr2.flat();

  //       const mergedArray1: any[] = flatArr1.map((item1) => {
  //         let matchingItem = flatArr2.find(
  //           (item2) => item2 && item1 && item2.imageId === item1.posts_data_id
  //         );
  //         return {
  //           ...item1,
  //           ...matchingItem,
  //           imageId: matchingItem ? matchingItem.imageId : null,
  //         };
  //       });

  //       // Thêm các phần tử mới vào state post hiện tại
  //       console.log("post", mergedArray1);
  //       setPost((prevPost: any[]) => [...prevPost, ...mergedArray1]);
  //       console.log("post", post);
  //       let arrPostId1: number[] = mergedArray1.map((obj) => obj.posts_data_id);

  //       console.log("check arrPostId", arrPostId1);
  //       setPostIdHasSeen((prevPostIdHasSeen: number[]) => [
  //         ...prevPostIdHasSeen,
  //         ...arrPostId1,
  //       ]);
  //       console.log("mergedArray1", mergedArray1);
  //     } else {
  //       setHasMore(false);
  //     }
  //   }
  //   console.log("postIdHasSeen", postIdHasSeen);
  //   console.log("check FormdataPostIdSaw", FormdataPostIdSaw);
  // };
  const displayMorePost = async () => {
    console.log("check ref", mySetRef);
    const myArray = Array.from(mySetRef.current);
    console.log("myArray", myArray);
    if (myArray.length > 0) {
      let getMorePost = await fetchMorePost(myArray);

      console.log("check getMore Post", getMorePost);
      let postMoreData: Post[] = [];
      console.log("getMorePost", getMorePost);
      if (getMorePost.data.DT && getMorePost.data.DT.length > 0) {
        console.log("getMorePost.data.DT", getMorePost.data.DT);
        postMoreData = getMorePost.data.DT;
        //  console.log("check postData", postData);
      }
      if (getMorePost) {
        console.log("postMoreData", postMoreData);
        setPost((prevPost) => [...prevPost, ...postMoreData]);
        let arrPostIdHasSeen = Array.from(mySetRef.current);
        sendPostIdToServer(arrPostIdHasSeen);
      }
    } else {
      console.log("No");
    }
  };

  return (
    <ScrollContainer>
      <Content>
        <Section>
          {post.length > 0 ? (
            post.map((element, index) => {
              const postId = element.posts_data_id || `post-${index}`;
              //console.log("element.likes", element.likers);
              //console.log("element.comments", element.comments);
              return (
                <>
                  <Items
                    username={element.username}
                    hashtag={element.hashtag}
                    postId={postId}
                    content={element.content}
                    contentEditor={element.contentEditor}
                    status={element.status}
                    images={element.images}
                  />
                  <Like
                    postId={element.posts_data_id}
                    like={element.likers}
                    countLike={element.countLike}
                  />
                  <Comment
                    comment={element.comments}
                    postId={element.posts_data_id}
                  />
                  <span>---------------------------------------</span>
                </>
              );
            })
          ) : (
            <div>No posts available</div>
          )}
          {hasMore && (
            <button onClick={displayMorePost}>Render New Post</button>
          )}
        </Section>
      </Content>
    </ScrollContainer>
  );
};

export default NewFeed;

//import axios from "axios";
import { METHODS } from "http";
import axios from "../configs/axios";
const LoginApi = async (formDT: FormData) => {
  // Make a request for a user with a given ID
  // axios.get('/user?ID=12345')
  //   .then(function (response) {
  return axios.post("/login", formDT, {
    // email,
    // password,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // cho phép nhận cookie
    withCredentials: true,
  });

  //
  // function viết riêng ra nhé gọi đến function ở đoạn này để
  //truyền data qua lại thông qua url này này '/user?ID=12345'
  //
  //
  ////     // handle success
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error);
  //   })
  //   .finally(function () {
  //     // always executed
  //   });
};
const setNamespaceLiveFeed = async (token: string) => {
  return axios.post("/live-feeds-room", token, {
    headers: {
      "Content-Type": "multipart/form-data",
    },

    withCredentials: true,
  });
};
const getUserInfo = () => {
  return axios.get("/get-user", {
    // email,
    // password,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // cho phép nhận cookie
    withCredentials: true,
  });
};
const userUpLoadPost = (formPostContent: FormData) => {
  return axios.post("/upload-post", formPostContent, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
const test = () => {
  return axios.post("/test", {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
const uploadAvatar = (avt: FormData) => {
  return axios.post("/upload-avatar", avt, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
const getUserListPost = () => {
  return axios.get("/get-listpost", {
    // email,
    // password,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // cho phép nhận cookie
    withCredentials: true,
  });
};
const getUserDataWithPost = () => {
  return axios.get("/get-listpost", {
    // email,
    // password,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // cho phép nhận cookie
    withCredentials: true,
  });
};
const fetchMorePost = (listPostHasSeen) => {
  return axios.post("/list-morepost", {
    body: {
      listPostHasSeen,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
};
const fetchNumberLikeEachPost = () => {};
const userLikePostId = (postId: string) => {
  return axios.post("/user_like_post", {
    body: {
      postId: postId,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // cho phép nhận cookie
    withCredentials: true,
  });
};

const userCommentPost = (postId, commentContent) => {
  return axios.post("/user_comment_post", {
    body: {
      postId: postId,
      commentContent: commentContent,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // cho phép nhận cookie
    withCredentials: true,
  });
};
const getNewNumberOfLikeInEachPost = (postId: string | null) => {
  const url = `/fetch_update_like${
    postId ? `?postId=${encodeURIComponent(postId)}` : ""
  }`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json", // Đối với GET requests, thường là "application/json"
    },
    withCredentials: true,
  });
};
const getNewContentCommentOfPost = (postId: string | null) => {
  const url = `/fetch_update_commentContent${
    postId ? `?postId=${encodeURIComponent(postId)}` : ""
  }`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json", // Đối với GET requests, thường là "application/json"
    },
    withCredentials: true,
  });
};

const getAllNotify = () => {
  return axios.get("/get_all_notify", {
    // email,
    // password,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // cho phép nhận cookie
    withCredentials: true,
  });
};
const getLastNotify = (id: string) => {
  const url = `/get_last_notify${id ? `?id=${encodeURIComponent(id)}` : ""}`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json", // Đối với GET requests, thường là "application/json"
    },
    withCredentials: true,
  });
};
export {
  LoginApi,
  getUserInfo,
  userUpLoadPost,
  test,
  uploadAvatar,
  getUserListPost,
  getUserDataWithPost,
  fetchMorePost,
  setNamespaceLiveFeed,
  userLikePostId,
  fetchNumberLikeEachPost,
  userCommentPost,
  getNewNumberOfLikeInEachPost,
  getNewContentCommentOfPost,
  getAllNotify,
  getLastNotify,
};

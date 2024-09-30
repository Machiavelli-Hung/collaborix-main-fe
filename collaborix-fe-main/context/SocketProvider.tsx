import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./Provider";
import { getAllNotify, getLastNotify } from "../api/userApi";

interface Post {
  posts_data_id: number | null;
  hashtag: string | null;
  content: string | null;
  contentEditor: string | null;
  status: string | null;
  summary: string | null;
  images: object | null;
}
interface NotifyObject {
  entityId: string;
  entityType: string;
  message: string;
  isRead: string;
}
interface NotifyType {
  notify: NotifyObject[];
}

interface SocketContextProps {
  socketInstance: Socket | null;
  notification: NotifyType[] | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
  listPost: Post[];
  triggerEventLogin: () => void;
  sendPostIdToServer: (arrPostId: Array<string>) => void;
  RegisterTolistenRealtimeLikeDataFromServer: () => void;
  RegisterTolistenRealtimeCommentDataFromServer: () => void;
  reconnectAfterRefresh: () => void;
  RegisterToListenNotifyAfterCreatedPost: () => void;
  getNotifyData: (data) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC = ({ children }) => {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);
  const [listPosts, setListPosts] = useState<Post[]>([]);
  const [isConnected, setIsConnected] = useState<Boolean>(false);
  const { tokenJwt } = useUser();
  const [notification, setNotification] = useState<NotifyType[]>([]);

  const connectSocket = () => {
    const socket = io("http://167.71.197.160:8000", {
      withCredentials: true,
      extraHeaders: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    socket.on("connect", async () => {
      console.log("Connected to the server");
      setIsConnected(true); // Cập nhật trạng thái kết nối
      let fetchTwoNotifycationNewest = await getAllNotify();
      console.log("fetchTwoNotifycationNewest", fetchTwoNotifycationNewest);
      if (
        fetchTwoNotifycationNewest &&
        fetchTwoNotifycationNewest.data.DT.length > 0
      ) {
        setNotification(fetchTwoNotifycationNewest.data.DT);
        console.log(
          "fetchTwoNotifycationNewest.data.DT",
          fetchTwoNotifycationNewest.data.DT
        );
      }
    });

    socket.on("loginSuccess", (data) => {
      console.log("Login successful", data);
    });
    // socket.on("update_like_realtime", (postIdHaveNewNumberOfLike) => {
    //   console.log("There is a post have new update in like number", postIdHaveNewNumberOfLike);

    // });
    socket.on("update_comment_realtime", (postIdHaveNewComment) => {
      console.log(
        "There is a post have new update in comment content ",
        postIdHaveNewComment
      );
    });
    socket.on("notify_created_post_succeed", (data) => {
      console.log("created post thành công", data);
    });
    setSocketInstance(socket);
  };

  const triggerEventLogin = () => {
    if (socketInstance && isConnected) {
      console.log("socketInstance", socketInstance);
      console.log("isConnected", isConnected);
      socketInstance.emit("login");
    }
  };
  const sendPostIdToServer = (arrPostId: Array<string>) => {
    socketInstance?.emit("postViewed", arrPostId);
  };
  const RegisterTolistenRealtimeLikeDataFromServer = () => {
    socketInstance?.emit("realtime_update_like");
  };
  const RegisterTolistenRealtimeCommentDataFromServer = () => {
    socketInstance?.emit("realtime_update_comment");
  };
  const RegisterToListenNotifyAfterCreatedPost = () => {
    socketInstance?.emit("notify_after_created_post");
  };
  const disconnectSocket = () => {
    if (socketInstance) {
      socketInstance.disconnect();
      setIsConnected(false);
      setSocketInstance(null);
    }
  };
  const reconnectAfterRefresh = () => {
    if (!socketInstance && tokenJwt) {
      connectSocket();
    }
  };
  const getNotifyData = async (notifyId) => {
    // set data notify array
    console.log("check data", notifyId);
    console.log("notia", notifyId);
    const newestNotifyData = await getLastNotify(notifyId);
    console.log("check newestNotifyData", newestNotifyData.data.DT);
    // Tạo một bản sao của Set hiện tại để giữ các giá trị cũ

    // Thêm từng phần tử của array vào Set

    setNotification((prevNotify) => [
      ...prevNotify,
      ...newestNotifyData.data.DT,
    ]);
  };
  useEffect(() => {
    console.log("notify", notification);
  }, [notification]);
  useEffect(() => {
    return () => {
      if (socketInstance) {
        console.log("socketInstance", socketInstance);
        socketInstance.disconnect();
      }
    };
  }, [socketInstance]);

  return (
    <SocketContext.Provider
      value={{
        socketInstance,
        connectSocket,
        disconnectSocket,
        triggerEventLogin,
        sendPostIdToServer,
        RegisterTolistenRealtimeLikeDataFromServer,
        RegisterTolistenRealtimeCommentDataFromServer,
        reconnectAfterRefresh,
        RegisterToListenNotifyAfterCreatedPost,
        notification,
        getNotifyData,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

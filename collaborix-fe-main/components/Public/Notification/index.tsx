import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSocket } from "../../../context/SocketProvider";
import NotificationItem from "./item";
const ScrollContainer = styled.div`
  height: 100px;
  overflow-y: auto; /* Cho phép cuộn dọc */
  overflow-x: hidden; /* Ẩn cuộn ngang nếu cần */
`;
interface NotifyObject {
  entityId: string;
  entityType: string;
  message: string;
  isRead: string;
}
interface NotifyType {
  notify: NotifyObject[];
}

const Notification: React.FC = () => {
  const { notification } = useSocket();
  const [notificationData, setNotificationData] = useState<NotifyObject[]>([]);

  useEffect(() => {
    console.log("notification", notification);
    if (notification && notification.length > 0) {
      // Lấy mảng notify từ đối tượng notification
      setNotificationData(notification);
    }
  }, [notification]);

  useEffect(() => {
    if (notificationData.length > 0) {
      console.log("// setNotificationData(notification);", notificationData);
    }
  }, [notificationData]);

  return (
    <>
      <ScrollContainer>
        {notificationData.length > 0 && (
          <div className="notificationData">
            {notificationData.map((element, index) => (
              <div className="flex" key={index}>
                <NotificationItem
                  message={element.message}
                  isRead={element.isRead}
                  entityId={element.entityId}
                  entityType={element.entityType}
                />
              </div>
            ))}
          </div>
        )}
      </ScrollContainer>
    </>
  );
};

export default Notification;

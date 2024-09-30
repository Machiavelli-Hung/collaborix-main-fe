import React from "react";
import styled from "styled-components";

interface NotifyObject {
  entityId: string;
  entityType: string;
  message: string;
  isRead: string;
}

const NotificationItem: React.FC<NotifyObject> = ({
  entityId,
  entityType,
  message,
  isRead,
}) => {
  return <NotificationItemContainer>{message}</NotificationItemContainer>;
};

const NotificationItemContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export default NotificationItem;

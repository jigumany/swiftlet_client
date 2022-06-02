import { gql } from "@apollo/client";

export const MY_CHATROOMS = gql`
  query listChatrooms {
    listChatRooms {
      id
      newMessages
      ChatRoomUsers {
        id
        name
        imageUri
        mobile
      }
      LastMessage {
        id
        content
        audio
        image
        createdAt
      }
      Messages {
        id
        content
        audio
        image
        userID
        chatroomID
        name
      }
    }
  }
`;

export const MY_GROUP_CHATROOMS = gql`
  query listGroupChatRooms {
    listGroupChatRooms {
      id
      adminID
      groupImage
      groupName
      Members {
        id
        name
        imageUri
        mobile
      }
      LastMessage {
        id
        content
        audio
        image
        createdAt
      }
      Messages {
        id
        content
        audio
        image
        userID
        chatroomID
        name
      }
    }
  }
`;

export const GET_AUTHED_USER = gql`
  query getUser {
    getUser {
      id
      name
      imageUri
      mobile
      pin
      contacts {
        id
        name
        imageUri
      }
    }
  }
`;

export const GET_USERS = gql`
  query listUsers {
    listUsers {
      id
      name
      imageUri
      mobile
    }
  }
`;

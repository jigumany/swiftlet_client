import { gql } from "@apollo/client";

export const MESSAGE_SUBSCRIPTION = gql`
  subscription onMessageCreated {
    messageCreated {
      id
      userID
      content
      createdAt
      image
      audio
    }
  }
`;

export const MESSAGE_SEND = gql`
  subscription sendMessage {
    messageCreated {
      id
      userID
      content
      createdAt
      image
      audio
    }
  }
`;

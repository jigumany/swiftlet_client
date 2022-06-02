import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation signUp($name: String!, $mobile: String!) {
    signUp(input: { name: $name, mobile: $mobile }) {
      token
      user {
        id
        name
        mobile
      }
    }
  }
`;

export const VERIFY_MUTATION = gql`
  mutation verify($mobile: String!, $verification_code: String!) {
    verify(input: { mobile: $mobile, verification_code: $verification_code }) {
      token
      user {
        id
        name
      }
    }
  }
`;

export const REGISTER_KEY_BUNDLE_MUTATION = gql`
  mutation storeKeyBundle($address: String!, $bundle: String!) {
    storeKeyBundle(input: { address: $address, bundle: $bundle }) {
      address
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      imageUri
    }
  }
`;

export const ADD_CONTACT_TO_USER = gql`
  mutation addContactToUser($input: UserContactInput!) {
    addContactToUser(input: $input) {
      id
      name
      imageUri
      contacts {
        id
        name
        imageUri
      }
    }
  }
`;

export const CREATE_CHATROOM = gql`
  mutation createChatRoom($input: CreateChatRoomInput!) {
    createChatRoom(input: $input) {
      id
      newMessages
      LastMessage {
        audio
        id
        image
        userID
        chatroomID
        content
      }
      Messages {
        audio
        chatroomID
        content
        image
        userID
        name
      }
      ChatRoomUsers {
        id
        imageUri
        name
        mobile
      }
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroupChatRoom($input: CreateGroupChatRoomInput!) {
    createGroupChatRoom(input: $input) {
      id
      adminID
      groupName
      groupImage
      newMessages
      LastMessage {
        audio
        id
        image
        userID
        chatroomID
        content
      }
      Messages {
        audio
        chatroomID
        content
        image
        userID
        name
      }
      Members {
        id
        imageUri
        name
        mobile
      }
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroupChatRoom($input: UpdateGroupChatRoomInput!) {
    updateGroupChatRoom(input: $input) {
      id
      adminID
      groupName
      groupImage
      newMessages
      LastMessage {
        audio
        id
        image
        userID
        chatroomID
        content
      }
      Messages {
        audio
        chatroomID
        content
        image
        userID
        name
      }
      Members {
        id
        imageUri
        name
        mobile
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      content
      userID
      chatroomID
      image
      audio
      name
    }
  }
`;

export const CREATE_MESSAGE_IMAGE = gql`
  mutation createMessageImage($input: CreateImageMessageInput!) {
    createMessageImage(input: $input) {
      content
      userID
      chatroomID
      image
      name
    }
  }
`;

export const CREATE_MESSAGE_AUDIO = gql`
  mutation createMessageAudio($input: CreateAudioMessageInput!) {
    createMessageAudio(input: $input) {
      content
      userID
      chatroomID
      audio
      name
    }
  }
`;

export const DELETE_GROUP = gql`
  mutation deleteGroupChatRoom($id: Int) {
    deleteGroupChatRoom(id: $id) {
      Boolean
    }
  }
`;

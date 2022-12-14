import { signalStore, usernameSubject } from "../identity/state";
import { addMessageToSession } from "../sessions/functions";
import { sessionForRemoteUser, sessionListSubject } from "../sessions/state";
import { ChatSession } from "../sessions/types";
import encoding from "text-encoding";
import { LogBox } from "react-native";

import {
  MessageType,
  SessionCipher,
  SignalProtocolAddress,
} from "@privacyresearch/libsignal-protocol-typescript";
import { sendSignalProtocolMessage } from "./api";
import { ProcessedChatMessage } from "./types";

LogBox.ignoreLogs(["Require cycle:"]);

export async function processPreKeyMessage(
  address: string,
  message: MessageType
): Promise<void> {
  console.log("processPreKeyMessage");
  const cipher = new SessionCipher(
    signalStore,
    new SignalProtocolAddress(address, 1)
  );
  const plaintextBytes = await cipher.decryptPreKeyWhisperMessage(
    message.body!,
    "binary"
  );

  const session: ChatSession = sessionForRemoteUser(address) || {
    remoteUsername: address,
    messages: [],
  };

  const sessionList = [...sessionListSubject.value];
  sessionList.unshift(session);
  sessionListSubject.next(sessionList);

  let cm: ProcessedChatMessage | null = null;
  try {
    const plaintext = new encoding.TextDecoder().decode(
      new Uint8Array(plaintextBytes)
    );
    cm = JSON.parse(plaintext) as ProcessedChatMessage;

    addMessageToSession(address, cm);
  } catch (e) {
    console.log("PreKey message does not contain JSON");
  }
}

export async function processRegularMessage(
  address: string,
  message: MessageType
): Promise<void> {
  console.log("processRegularMessage");
  const cipher = new SessionCipher(
    signalStore,
    new SignalProtocolAddress(address, 1)
  );
  const plaintextBytes = await cipher.decryptWhisperMessage(
    message.body!,
    "binary"
  );
  const plaintext = new encoding.TextDecoder().decode(
    new Uint8Array(plaintextBytes)
  );

  const cm: ProcessedChatMessage = JSON.parse(plaintext);
  console.log("Decrypted: ", { cm });
  addMessageToSession(address, cm);
}

export async function encryptAndSendMessage(
  to: string,
  message: string
): Promise<void> {
  const address = new SignalProtocolAddress(to, 1);
  const cipher = new SessionCipher(signalStore, address);

  const cm: ProcessedChatMessage = {
    id: `${Date.now()}`,
    address: to,
    from: usernameSubject.value,
    timestamp: Date.now(),
    body: message,
  };

  // add message to session
  addMessageToSession(to, cm);

  // encrypt the message
  const signalMessage = await cipher.encrypt(
    new encoding.TextEncoder().encode(JSON.stringify(cm)).buffer
  );

  sendSignalProtocolMessage(to, usernameSubject.value, signalMessage);
}

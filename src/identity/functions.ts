import {
  KeyHelper,
  PreKeyType,
  SignedPublicPreKeyType,
} from "@privacyresearch/libsignal-protocol-typescript";
import { SignalDirectory } from "../signal/signal-directory";
import { directorySubject, signalStore, usernameSubject } from "./state";

import { initializeSignalWebsocket } from "../messages/api";
import { networkInfoSubject } from "../network/state";
import { subscribeWebsocket } from "../network/websocket";

export async function createIdentity(username: string): Promise<void> {
  const url = "https://lnuds10f8i.execute-api.us-west-2.amazonaws.com/dev";
  const wss = "wss://jm8iz3rreg.execute-api.us-west-2.amazonaws.com/dev";
  const apiKey = "kbMvTxbST66DaxLVpuLfu8G5bi7VhTnM1zG4kb6K";
  const directory = new SignalDirectory(url, apiKey);

  directorySubject.next(directory);
  usernameSubject.next(username);
  networkInfoSubject.next({ apiURL: url, apiKey, wssURI: wss });

  initializeSignalWebsocket(wss);
  subscribeWebsocket(username);

  const registrationId = KeyHelper.generateRegistrationId();
  // Store registrationId somewhere durable and safe... Or do this.
  signalStore.put(`registrationID`, registrationId);

  const identityKeyPair = await KeyHelper.generateIdentityKeyPair();
  // Store identityKeyPair somewhere durable and safe... Or do this.c
  signalStore.put("identityKey", identityKeyPair);

  const baseKeyId = Math.floor(10000 * Math.random());
  const preKey = await KeyHelper.generatePreKey(baseKeyId);
  signalStore.storePreKey(`${baseKeyId}`, preKey.keyPair);

  const signedPreKeyId = Math.floor(10000 * Math.random());
  const signedPreKey = await KeyHelper.generateSignedPreKey(
    identityKeyPair,
    signedPreKeyId
  );
  signalStore.storeSignedPreKey(`${signedPreKeyId}`, signedPreKey.keyPair);
  const publicSignedPreKey: SignedPublicPreKeyType = {
    keyId: signedPreKeyId,
    publicKey: signedPreKey.keyPair.pubKey,
    signature: signedPreKey.signature,
  };

  // Now we register this with the server so all users can see them
  const publicPreKey: PreKeyType = {
    keyId: preKey.keyId,
    publicKey: preKey.keyPair.pubKey,
  };
  directory.storeKeyBundle(username, {
    registrationId,
    identityKey: identityKeyPair.pubKey,
    signedPreKey: publicSignedPreKey,
    oneTimePreKeys: [publicPreKey],
  });
}

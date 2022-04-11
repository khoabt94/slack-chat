import {
  DomainVerification,
  InfoOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { selectRoomId } from "../slice/appSlice";
import ChatInput from "./ChatInput";
import Message from "./Message";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import Loading from "./Loading";
import { appActions } from "../slice/appSlice";

const Chat = () => {
  const chatBottomRef = useRef(null);
  const dispatch = useDispatch();
  const roomId = useSelector(selectRoomId);
  const channelDocRef = doc(db, "channels", roomId || "a");
  const messageColRef = collection(db, `channels/${roomId || "a"}/message`);
  const qMessage = query(messageColRef, orderBy("timestamp", "asc"));

  const [roomName, loadingRoom, errorRoom] = useDocument(channelDocRef);
  const { name } = roomName?.data() || "room-name";

  const [messagesList, loadingMessage, errorMessage] = useCollection(qMessage);
  const messages = messagesList?.docs.map((doc) => doc.data());

  useEffect(() => {
    chatBottomRef?.current?.scrollIntoView({ behavior: "smooth" });
    const uniqueUser = [...new Set(messages?.map((el) => el.user))];
    const uniqueUserArr = uniqueUser.map((el1) => {
      const { userImage } = messages.find((el2) => el2.user === el1);
      return {
        user: el1,
        userImage,
      };
    });
    const action = appActions.countMem(uniqueUserArr);
    dispatch(action);
  }, [roomId, messages]);

  return (
    <div className="flex flex-col border border-gray-200 chat">
      {loadingMessage && <Loading />}
      {!roomId ? null : (
        <>
          <div className="flex justify-between p-5 border border-gray-200">
            <div className="flex items-center">
              <h4 className="flex font-semibold lowercase">#{name}</h4>
            </div>
          </div>
          <div className="flex-grow overflow-y-scroll">
            {messages?.length > 0
              ? messages.map((item, index) => {
                  const { user, message, timestamp, userImage } = item;
                  return (
                    <Message
                      key={index}
                      message={message}
                      user={user}
                      timestamp={timestamp}
                      userImage={userImage}
                    />
                  );
                })
              : null}
            <div className="chat-bottom" ref={chatBottomRef}></div>
          </div>
          <ChatInput
            className=""
            channelName={name}
            channelId={roomId}
          ></ChatInput>
        </>
      )}
    </div>
  );
};

export default Chat;

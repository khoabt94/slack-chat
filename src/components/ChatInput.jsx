import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

const ChatInput = ({ channelName, channelId }) => {
  const channelRef = collection(db, "channels");
  const [message, setMessage] = useState("");
  const [userCurrent] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId) return;
    const docRef = doc(db, "channels", channelId);
    const messageRef = collection(docRef, "message");

    addDoc(messageRef, {
      user: userCurrent?.displayName,
      message,
      timestamp: serverTimestamp(),
      userImage: userCurrent?.photoURL,
    });

    setMessage("");
  };

  return (
    <div className="">
      <form className="flex justify-center p-5 border border-gray-300">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #${channelName}`}
          className="w-3/5 p-5 border border-gray-300 outline-none"
        />
        <button
          className="p-5 font-medium text-white outline-none bg-primary hover:opacity-90"
          type="submit"
          onClick={sendMessage}
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatInput;

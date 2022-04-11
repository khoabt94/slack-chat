import React from "react";

const Message = ({ user, message, timestamp, userImage }) => {
  return (
    <div className="flex items-center p-5">
      <img
        src={userImage}
        alt={user}
        className="h-[50px] w-[50px] object-cover rounded-lg"
      />
      <div className="pl-3">
        <h4 className="font-semibold">
          {user}{" "}
          <span className="text-gray-400 font-light ml-1 text-[0.8rem]">
            {new Date(timestamp?.toDate()).toLocaleTimeString() ===
            "Invalid Date"
              ? "Just Now"
              : new Date(timestamp?.toDate()).toLocaleTimeString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;

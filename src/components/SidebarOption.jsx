import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { appActions, selectActiveNavbar } from "../slice/appSlice";

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const channelRef = collection(db, "channels");
  const dispatch = useDispatch();

  const addChannel = () => {
    const channelName = prompt("Please enter new channel");

    if (channelName) {
      addDoc(channelRef, {
        name: channelName,
      });
    }
  };
  const selectChannel = () => {
    if (id) {
      const action1 = appActions.enterRoom(id);
      dispatch(action1);
    }

    const action2 = appActions.activeMenu(false);
    dispatch(action2);
  };
  return (
    <div
      onClick={addChannelOption ? addChannel : selectChannel}
      className="p-[10px] flex gap-x-3 text-xs items-center cursor-pointer hover:opacity-90 hover:bg-[#340e36]"
    >
      {Icon && <Icon fontSize="small" />}
      {Icon ? (
        <h3 className="font-medium">{title}</h3>
      ) : (
        <h3 className="py-2 font-light">
          <span className="p-4">#</span> {title}
        </h3>
      )}
    </div>
  );
};

export default SidebarOption;

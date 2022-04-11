import {
  Add,
  Apps,
  Bookmark,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
  Close,
} from "@mui/icons-material";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { auth, db } from "../firebase";
import { appActions, selectActiveNavbar } from "../slice/appSlice";
import Loading from "./Loading";
import SidebarOption from "./SidebarOption";

const Sidebar = () => {
  const channelRef = collection(db, "channels");
  const [user] = useAuthState(auth);
  const active = useSelector(selectActiveNavbar);
  const dispatch = useDispatch();

  const [channelsList, loading, error] = useCollection(channelRef);

  const channels = channelsList?.docs.map((doc) => {
    const channel = doc.data();
    const { name } = channel;
    return { name, id: doc.id };
  });

  const handleCloseSideBar = () => {
    const action2 = appActions.activeMenu(false);
    dispatch(action2);
  };

  return (
    <div
      className={`w-full h-full max-w-xs text-white border-t sidebar bg-primary border-secondary ${
        active ? "active" : null
      }`}
    >
      <div className="relative flex p-3 border-t border-secondary">
        <div className="flex-1 ">
          <h2 className="mb-1 text-base font-bold">
            {user?.displayName}
            {active && (
              <Close
                className="absolute cursor-pointer top-2 right-2"
                onClick={handleCloseSideBar}
              />
            )}
          </h2>
          <h3 className="flex items-center text-xs font-normal">
            <FiberManualRecord
              style={{ fontSize: "12px" }}
              className="mr-[2px] text-green-600"
            />
            {user?.email}
          </h3>
        </div>
      </div>

      <SidebarOption Icon={Add} addChannelOption title="Add Channel" />
      {loading ? (
        <Loading colorLoading="inherit" />
      ) : channels?.length > 0 ? (
        channels.map((channel) => (
          <SidebarOption
            key={channel.id}
            id={channel.id}
            title={channel.name}
          />
        ))
      ) : null}
    </div>
  );
};

export default Sidebar;

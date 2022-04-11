import { Avatar } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { appActions } from "../slice/appSlice";

const Header = () => {
  const [user] = useAuthState(auth);
  const [screensize, setScreensize] = useState(0);
  const [activeMenu, setActiveMenu] = useState(true);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then((res) => alert("Signout Successful!"))
      .catch((error) => alert(error.message));
  };

  const handleOpenSideBar = () => {
    const action = appActions.activeMenu(true);
    dispatch(action);
  };

  useEffect(() => {
    const handleScreensize = () => setScreensize(window.innerWidth);
    handleScreensize();
    window.addEventListener("resize", handleScreensize);

    return () => {
      window.removeEventListener("resize", handleScreensize);
    };
  }, []);

  useEffect(() => {
    if (screensize < 768) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screensize]);

  return (
    <div className="items-center w-full text-center text-white header bg-primary">
      {/* Header Left */}
      <div className="flex items-center ml-5 flex-[0.3] header__avatar">
        {!activeMenu && (
          <MenuIcon
            className="mr-3 cursor-pointer"
            onClick={handleOpenSideBar}
          />
        )}
        <Avatar
          className="cursor-pointer hover:opacity-80"
          src={user?.photoURL}
          onClick={handleSignOut}
        />
      </div>
      <div className="flex justify-center flex-grow header__logo">
        <h3 className="text-3xl header__logo-text">Wisper!</h3>
      </div>
      <div className="flex justify-center flex-grow header__right">&nbsp;</div>
    </div>
  );
};

export default Header;

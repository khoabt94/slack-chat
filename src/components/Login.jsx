import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((res) => alert("Sign-in Successful!"))
      .catch((error) => alert(error.message));
  };
  return (
    <div className="bg-[#f8f8f8] h-screen flex items-center justify-center login">
      <div className="p-[100px] text-center bg-white rounded-lg shadow">
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt="logo"
          className="object-contain h-[100px] mb-10"
        />
        <h1>Sign in to chat</h1>
        <p>Welcome!</p>
        <button
          type="button"
          onClick={signIn}
          className="px-6 py-3 mt-12 text-white rounded-md bg-secondary hover:opacity-80"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

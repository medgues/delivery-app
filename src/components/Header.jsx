import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import logo from "../img/logo.png";
import avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseauth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setisMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseauth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setisMenu(!isMenu);
    }
  };

  const logout = () => {
    setisMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 md:p-6 px-4 md:px-16 bg-primary">
      {/* desctop and tablet */}
      <div className="hidden md:flex w-full items-center justify-between  ">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">city</p>
        </Link>

        <div className="flex items-center gap-8">
          <div
            className="relative flex items-center justify-center cursor-pointer"
            onClick={() => showCart()}
          >
            <MdShoppingBasket className="text-textColor text-2xl" />
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-sm text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : avatar}
              alt="userprofile"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl object-cover cursor-pointer rounded-full"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0  px-4 py-2 "
              >
                <Link to={"/createItem"}>
                  <p
                    onClick={() => setisMenu(false)}
                    className=" py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    New Item <MdAdd />
                  </p>
                </Link>

                <p
                  className="py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  logout
                  <MdLogout />{" "}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full ">
        <div
          className="relative flex items-center justify-center"
          onClick={() => showCart()}
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer " />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-sm text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">city</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : avatar}
            alt="userprofile"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl object-cover cursor-pointer rounded-full"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0  "
            >
              <Link to={"/createItem"}>
                <p
                  onClick={() => setisMenu(false)}
                  className=" py-2 px-4 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  New Item <MdAdd />
                </p>
              </Link>
              <ul className="flex flex-col ">
                <li
                  onClick={() => setisMenu(false)}
                  className="py-2 px-4  text-base text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Home
                </li>
                <li
                  onClick={() => setisMenu(false)}
                  className="py-2 px-4 text-base text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Menu
                </li>
                <li
                  onClick={() => setisMenu(false)}
                  className="py-2 px-4 text-base text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                >
                  About us
                </li>
                <li
                  onClick={() => setisMenu(false)}
                  className="py-2 px-4 text-base text-textColor hover:text-headingColor hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Service
                </li>
              </ul>
              <p
                className="m-2 p-2 rounded-md shadow-md flex justify-center items-center gap-3 cursor-pointer bg-gray-300 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                logout
                <MdLogout />{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

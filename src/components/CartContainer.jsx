import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import emptyCart from "../img/emptyCart.svg";
import CartItem from "./CartItem";

const CartContainer = () => {
  const [{ cartItems, cartShow, user }, dispatch] = useStateValue();

  console.log("cartcontainer", cartItems);

  // useEffect(() => {
  //   console.log("useefect", items);
  //   dispatchUpdatedItems(items);
  // }, [items]);

  const hideCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 right-0 w-full md:w-375 h-[100vh] bg-white shadow-md flex flex-col z-[101] "
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer ">
        <motion.div whileTap={{ scale: 0.75 }}>
          <MdOutlineKeyboardBackspace
            className="text-textColor text-3xl"
            onClick={() => hideCart()}
          />
        </motion.div>
        <p className="text-textColor text-xl font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center justify-center gap-2 p-1 px-2 my-2 bg-gray-100  rounded-md hover:shadow-md  cursor-pointer text-textColor text-base"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* middel cart section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="h-full w-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart items section */}
          <div className="w-full h-340 md:42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cat item */}
            {cartItems &&
              cartItems.map((item) => <CartItem key={item.id} item={item} />)}
          </div>
          {/* total section  */}
          <div className=" w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between ">
              <p className="text-gray-400 text-lg">subtotal</p>
              <p className="text-gray-400 text-lg">$ 8.5</p>
            </div>
            <div className="w-full flex items-center justify-between ">
              <p className="text-gray-400 text-lg">delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className=" w-full flex items-center justify-between">
              <p className=" text-gray-200 text-xl font-semibold">total </p>
              <p className=" text-gray-200 text-xl font-semibold">$ 11</p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-300 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-300 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to checkout
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className=" w-full h-full flex flex-col items-center justify-center gap-6 p-16">
          <img src={emptyCart} alt="empty cart" />
          <p className="text-xl text-textColor font-serif ">
            {" "}
            Add Some Items to Your Cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;

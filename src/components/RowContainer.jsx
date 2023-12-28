import React, { useEffect, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import notFound from "../img/NotFound.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const RowContainer = ({ flag, data, rowContainerRef }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [items, setitems] = useState([]);
  const addToCart = (items) => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    addToCart(items);
  }, [items]);

  return (
    <div
      ref={rowContainerRef}
      className={`w-full flex gap-3 items-center my-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll  scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <motion.div
            whileTap={{ scale: 0.85 }}
            key={item.id}
            className="w-300 min-w-[300px] md:min-w-[340px] md:w-340 h-auto my-12 bg-cardOverlay rounded-lg p-4 shadow-md  backdrop-blur-lg hover:drop-shadow-lg"
            onClick={() => setitems([...cartItems, item])}
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className=" h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item.imageURL}
                  alt=""
                  className=" w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-gradient-to-t from-orange-300 to-orange-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col  items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item.calories} claories
              </p>
              <div className="flex items-center gap-8 ">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-orange-700">$</span>
                  {item.price}
                </p>
              </div>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="w-full h-full flex flex-col-reverse items-center justify-center">
          <img src={notFound} alt="" className="h-60 w-60" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;

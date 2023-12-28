import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const CartItem = ({ item }) => {
  const [{ cartItems }, dispatch] = useStateValue();
  const [qty, setqty] = useState(item.Qty);
  const [items, setitems] = useState([]);
  useEffect(() => {
    console.log("useEffect fired");
    setitems(cartItems);
  }, [qty]);

  console.log("cartitems", cartItems);
  const dispatchUpdatedItems = (items) => {
    console.log("dispatcheditems", items);
    setitems(items);
    dispatch({
      action: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const updateQty = (action, clickedItem) => {
    if (action === "add") {
      console.log("add", action, clickedItem);
      const mappeditems = cartItems.map((i) => {
        if (i.id === clickedItem.id) {
          i.Qty += 1;

          return i;
        }
        return i;
      });
      console.log("mappeditems", mappeditems);
      setqty(qty + 1);
      dispatchUpdatedItems(mappeditems);
    } else {
      console.log("remove", action, clickedItem);
      if (clickedItem.Qty === 1) {
        console.log("qty = 1");
        const filtredItems = cartItems.filter((i) => i.id !== clickedItem.id);
        setqty(qty - 1);
        dispatchUpdatedItems(filtredItems);
      } else {
        console.log("qtu /= 1");
        const mappeditems = cartItems.map((i) => {
          if (i.id === clickedItem.id) {
            i.Qty -= 1;
            return i;
          }
          return i;
        });
        console.log("mappeditems", mappeditems);
        setqty(qty - 1);
        dispatchUpdatedItems(mappeditems);
      }
    }
  };
  console.log(item);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className=" w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
    >
      <img
        src={item?.imageURL}
        alt=""
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
      />

      <div className=" flex flex-col gap-2">
        <p className="text-base text-gray-50 "> {item?.title}</p>
        <p className="text-sm block text-gray-300 font-semibold">
          $ {parseFloat(item?.price) * item.Qty}
        </p>
      </div>
      <div className="group flex items-center gap-2 ml-auto cursor-pointer ">
        <motion.div
          className="text-gray-50"
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("remove", item)}
        >
          <BiMinus />
        </motion.div>
        <p className=" w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
          {item.Qty}
        </p>
        <motion.div
          className="text-gray-50"
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty("add", item)}
        >
          <BiPlus />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartItem;

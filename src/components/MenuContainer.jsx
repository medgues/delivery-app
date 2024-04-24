import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = ({ data }) => {
  const [filter, setfilter] = useState("chicken");
  const [{ foodItems }, dispatch] = useStateValue();

  return (
    <section className="w-full my-6 " id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-300 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          {" "}
          Our hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories.map((item) => (
            <motion.div
              whileTap={{ scale: 0.75 }}
              key={item.id}
              className={`group hover:bg-red-500  ${
                filter === item.urlParaName ? "bg-red-500" : "bg-card"
              } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center`}
              onClick={() => setfilter(item.urlParaName)}
            >
              <div
                className={`w-10 h-10 rounded-full ${
                  filter === item.urlParaName ? "bg-white" : "bg-red-500"
                } bg-red-500 group-hover:bg-white flex items-center justify-center`}
              >
                <IoFastFood
                  className={` ${
                    filter === item.urlParaName
                      ? "text-textColor"
                      : "text-white"
                  } group-hover:text-textColor text-lg`}
                />
              </div>
              <p
                className={`${
                  filter === item.urlParaName ? "text-white" : "text-textColor"
                } text-smbnvvccx,,,,,,,,,,,,, text-textColor group-hover:text-card`}
              >
                {" "}
                {item.urlParaName}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="w-full ">
          <RowContainer
            flag={false}
            data={foodItems?.filter((item) => item.category === filter)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;

import React from "react";
import delivery from "../img/delivery.png";
import heroBg from "../img/heroBg.png";
import { Herodata } from "../utils/data";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center  gap-6 ">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-2 py-1 rounded-full ">
          <p className="text-base text-orange-500 font-semibold">
            Bike delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={delivery}
              alt="delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[3.5rem] font-bold tracking-wide text-headingColor">
          the fastest delivery in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5.5rem]">
            Algiers
          </span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
          aspernatur quidem ad, optio voluptas repellendus rem expedita
          obcaecati voluptate! Inventore sapiente veritatis totam harum nemo
          modi a, quaerat vero voluptatibus.
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 md:w-auto w-full px-4  py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative ">
        <img
          src={heroBg}
          alt="delivery"
          className="ml-auto w-full lg:w-auto h-420 lg:h-650 "
        />
        <div className="w-full h-full top-0 left-0 absolute flex items-center justify-center px-5 lg:px-32 py-4 flex-wrap gap-4">
          {Herodata &&
            Herodata.map((item) => (
              <div
                key={item.id}
                className="w-[140px] lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={item.image}
                  alt="delivery"
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20 "
                />
                <p></p>
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2">
                  {item.name}
                </p>
                <p className="text-[10px] lg:text-md text-lighttextGray 00 font-semibol my-1 lg:my-3">
                  {item.desc}
                </p>
                <p className="text-sm font-semibold  text-headingColor">
                  {" "}
                  <span className="text-xs text-orange-500">$ </span>{" "}
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;

import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFontDownload,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Createcontainer = () => {
  const [title, settitle] = useState("");
  const [calories, setcalories] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState(null);
  const [imageAssets, setimageAssets] = useState(null);
  const [fields, setfields] = useState(false);
  const [alertStatus, setalertStatus] = useState("danger");
  const [msg, setmsg] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [{}, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) =>
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    );
  };

  const uploadImage = (e) => {
    console.log("uploaded");
    setisLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("uploadProgress", uploadProgress);
      },
      (error) => {
        console.log("error", error);
        setfields(true);
        setmsg("Error while Uploading : Try again");
        setalertStatus("danger");
        setTimeout(() => {
          setfields(false);
          setisLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageAssets(downloadURL);
          setisLoading(false);
          setfields(true);
          setmsg("image uploaded successfully");
          setalertStatus("sucess");
          setTimeout(() => {
            setfields(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setisLoading(true);
    const deleteRef = ref(storage, imageAssets);
    deleteObject(deleteRef).then(() => {
      setimageAssets(null);
      setisLoading(false);
      setfields(true);
      setmsg("image Deleted successfully");
      setalertStatus("sucess");
      setTimeout(() => {
        setfields(false);
      }, 4000);
    });
    console.log("deleted");
  };
  const saveDetails = () => {
    setisLoading(true);
    console.log("data", title, calories, imageAssets, price, category);
    try {
      if (!title || !calories || !imageAssets || !price || !category) {
        setfields(true);
        setmsg("Required Fiels cant be empty");
        setalertStatus("danger");
        setTimeout(() => {
          setfields(false);
          setisLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAssets,
          category: category,
          calories: calories,
          Qty: 1,
          price: price,
        };
        saveItem(data);
        setisLoading(false);
        setfields(true);
        setmsg("data uploaded successfully");
        setalertStatus("sucess");
        clearData();
        fetchData();
        setTimeout(() => {
          setfields(false);
        }, 4000);
      }
    } catch (error) {
      console.log("error", error);
      setfields(true);
      setmsg("Error while Uploading : Try again");
      setalertStatus("danger");
      setTimeout(() => {
        setfields(false);
        setisLoading(false);
      }, 4000);
    }
    console.log("saved");
  };

  const clearData = () => {
    settitle("");
    setimageAssets(null);
    setcalories("");
    setprice("");
    setcategory(null);
  };

  return (
    <div className="w-full h-auto min-h-screen flex items-center justify-center ">
      <div className="w-[90%] md:w-[75%] border border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center gap-4 ">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl  text-gray-700 " />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => settitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent font  outline-none border-none placeholder:text-gray-500 text-textColor"
          />
        </div>
        <div className="w-full">
          <select
            name=""
            id=""
            onChange={(e) => setcategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="others" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParaName}
                  className="text-base border-0 text-headingColor bg-white outline-none capitalize"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAssets ? (
                <>
                  {" "}
                  <label
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                    htmlFor="uploadimage"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700 ">
                        Click Here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      id="uploadimage"
                      name="uploadimage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full ">
                    <img
                      src={imageAssets}
                      alt="uploaded"
                      className="object-contain w-full h-full"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full cursor-pointer bg-red-500 text-xl outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdFoodBank className="text-gray-700 text-2xl " />{" "}
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setcalories(e.target.value)}
              placeholder="Calories "
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 "
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdAttachMoney className="text-gray-700 text-2xl " />{" "}
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setprice(e.target.value)}
              placeholder="price "
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 "
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-400  px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createcontainer;

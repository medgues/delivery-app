export const fetchUser = () => {
  const userInfo =
    localStorage.getItem("user") !== "indefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};

export const fetchCartItems = () => {
  const userInfo =
    localStorage.getItem("cartItems") !== null
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];

  return userInfo;
};

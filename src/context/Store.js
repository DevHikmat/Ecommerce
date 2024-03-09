import { createContext, useContext, useEffect, useState } from "react";

const Store = createContext();

// o'zimizning hook
export const useStore = () => useContext(Store);

export default function StoreProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    informations: null,
  });
  const [cartList, setCartList] = useState([]);

  // mahsulotni savatga qo'shish
  const handleAddCart = (currentProd) => {
    const { id } = currentProd;
    let isHave = cartList.find((item) => item.product.id === id);
    if (isHave) {
      setCartList((prev) =>
        prev.map((item) => {
          if (item.id == id) return { ...item, count: item.count + 1 };
          else return item;
        })
      );
    } else {
      setCartList((prev) => [...prev, { product: currentProd, count: 1 }]);
    }
  };
  //  savatdagi mahsulotdan yana qo'shish.
  const handleIncrementProd = (id) => {
    setCartList((prev) =>
      prev.map((item) => {
        if (item.product.id == id) return { ...item, count: item.count + 1 };
        else return item;
      })
    );
  };
  //  savatdagi mahsulotdan kamaytrish.
  const handleDecrementProd = (id) => {
    setCartList((prev) =>
      prev.map((item) => {
        if (item.product.id == id) return { ...item, count: item.count - 1 };
        else return item;
      })
    );
  };
  //  savatdagi mahsulotni chopish.
  const handleRemoveProd = (id) => {
    setCartList((prev) => prev.filter((item) => item.product.id != id));
  };

  useEffect(() => {
    let oldCartList = localStorage.getItem("cart");
    if (oldCartList) setCartList(JSON.parse(oldCartList));
    else setCartList([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }, [cartList]);

  return (
    <Store.Provider
      value={{
        user,
        setUser,
        cartList,
        setCartList,
        handleAddCart,
        handleIncrementProd,
        handleDecrementProd,
        handleRemoveProd,
      }}
    >
      <Store.Consumer>{() => children}</Store.Consumer>
    </Store.Provider>
  );
}

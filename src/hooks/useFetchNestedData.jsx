import { useState } from "react";
import { query, collection, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const useFetchValidate = (collections, userId, param) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCollection = () => {
    setLoading(true);
    const productRef = collection(db, collections);
    const items = query(productRef, where(`${param}`, "==", `${userId}`));

    onSnapshot(items, (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(allProducts);
      setLoading(false);
    });
  };

  return {
    data,
    loading,
    getCollection,
  };
};

export default useFetchValidate;

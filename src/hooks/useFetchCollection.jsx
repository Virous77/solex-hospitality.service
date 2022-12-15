import { useState, useEffect } from "react";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const useFetchCollection = (collections) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCollection = () => {
    setLoading(true);
    const productRef = collection(db, collections);
    const items = query(productRef, orderBy("createdAt", "desc"));

    onSnapshot(items, (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(allProducts);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCollection();
  }, []);

  return {
    data,
    loading,
    getCollection,
  };
};

export default useFetchCollection;

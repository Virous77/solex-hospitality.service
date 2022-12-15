import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/firebase.config";

const useFetchUser = (collection, id) => {
  const [userData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductById = async () => {
    setLoading(true);

    const docRef = doc(db, `${collection}`, id);
    const docsnap = await getDoc(docRef);
    setLoading(false);

    if (docsnap.exists) {
      setData(docsnap.data());
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getProductById();
    }
  }, [id]);

  return {
    userData,
    loading,
    getProductById,
  };
};

export default useFetchUser;

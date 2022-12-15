import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { serverTimestamp, collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import { useEffect } from "react";
import useFetchCollection from "../hooks/useFetchCollection";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const getLocalStorage = () => {
    const data = localStorage.getItem("solvex");
    const result = data ? JSON.parse(data) : initialState;
    return result;
  };

  const initialState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    isLoggedIn: false,
  };

  const [user, setUser] = useState(getLocalStorage());
  const { email, password, firstName, lastName, confirmPassword } = user;
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [activeUser, setActiveUser] = useState("");
  const [news, setNews] = useState("");
  const navigate = useNavigate();

  const { data, getCollection } = useFetchCollection("users");

  useEffect(() => {
    getCollection();
  }, [news]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitUser = async () => {
    if (password !== confirmPassword) {
      setLoading(false);
      toast.error("Password must be same");
      return;
    }

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      setLoading(false);
      toast.error("All fields must be filled..");
      return;
    }

    setLoading(true);
    try {
      const { user: users } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      const tempdata = {
        isLoggedIn: true,
      };

      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        uid: users.uid,
        photoURL: users.photoURL || null,
        languages: [],
        reviews: [],
        createdAt: serverTimestamp(),
      };

      localStorage.setItem("solvex", JSON.stringify(tempdata));
      await addDoc(collection(db, "users"), userData);
      setUser(tempdata);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong, Try again!");
    }
  };

  ///LoginUser
  const LoginUser = async () => {
    if (!password || !email) {
      setLoading(false);
      toast.error("All fields must be filled..");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      const tempdata = {
        isLoggedIn: true,
      };
      localStorage.setItem("solvex", JSON.stringify(tempdata));
      navigate("/");
      setUser(tempdata);
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong, Try again!");
    }
  };

  const getCurrentUser = () => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setActiveUser(user);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/sign-in");
    setUser(initialState);
    localStorage.removeItem("solvex");
  };

  const googleLogin = async () => {
    setGoogleLoading(true);

    const provider = new GoogleAuthProvider();
    try {
      const { user: users } = await signInWithPopup(auth, provider);
      setNews(users.uid);

      const unique = data.find((ids) => ids.uid === users.uid);

      const userData = {
        firstName: users.displayName,
        lastName: null,
        email: users.email,
        uid: users.uid,
        photoURL: users.photoURL || null,
        createdAt: serverTimestamp(),
        languages: [],
        reviews: [],
      };

      const tempdata = {
        isLoggedIn: true,
      };
      localStorage.setItem("solvex", JSON.stringify(tempdata));

      if (!unique) {
        await addDoc(collection(db, "users"), userData);
      }
      setGoogleLoading(false);
      setUser(tempdata);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setGoogleLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleChange,
        submitUser,
        LoginUser,
        loading,
        getCurrentUser,
        logout,
        activeUser,
        googleLogin,
        googleLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

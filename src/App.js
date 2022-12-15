import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/profile/ProfilePage";
import {
  HomePage,
  ErrorPage,
  LoginPage,
  RegisterPage,
  Rooms,
  Book,
  SolexUsers,
} from "./pages/index";
import Navbar from "./components/layout/Navbar";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <section className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route
          path="/profile/*"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="/rooms/:name/:id" element={<Rooms />} />
        <Route path="/book/:id" element={<Book />} />
        <Route path="/users/:id" element={<SolexUsers />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </section>
  );
}

export default App;

import React from "react";
import "../styles/Error.css";
import Card from "../components/UI/Card";
import error from "../assets/error404.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="mainErrorBar">
      <Card>
        <div className="mainErrorContent">
          <img src={error} alt="404 not found" />
          <p>Page not found!!</p>

          <button>
            <Link to="/">Go to Home</Link>
          </button>
        </div>
      </Card>
    </section>
  );
};

export default ErrorPage;

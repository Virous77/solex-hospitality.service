import React from "react";
import Card from "../UI/Card";
import { BsTwitter, BsGithub } from "react-icons/bs";

const RoomFooter = () => {
  const date = new Date();

  return (
    <footer className="roomFooter">
      <Card>
        <div className="warpFooter">
          <p>&copy; {date?.getFullYear()} Solex</p>

          <div className="social">
            <a href={`https://github.com/Virous77`} target="blank">
              <BsGithub />
            </a>

            <a href={`https://twitter.com/imbitcoinb`} target="blank">
              <BsTwitter />
            </a>
          </div>
        </div>
      </Card>
    </footer>
  );
};

export default RoomFooter;

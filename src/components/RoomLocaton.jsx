import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { CgChevronRight } from "react-icons/cg";
import { AiOutlineCloseCircle } from "react-icons/ai";

const RoomLocaton = ({ aboutLocation, location, locationData, scroller }) => {
  const position = location;
  const [showLocation, setShowLocation] = useState(false);

  return (
    <>
      <section className="mapsOk" ref={scroller}>
        <h2>Where you’ll be</h2>
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>{locationData}</Popup>
          </Marker>
        </MapContainer>
      </section>

      <div className="locationAbout">
        <p>{locationData}</p>

        <div className="locationDesc">
          <span>{aboutLocation?.substring(0, 250)}...</span>
        </div>

        <p className="showDesc" onClick={() => setShowLocation(true)}>
          <span>Show more</span>
          <CgChevronRight />
        </p>
      </div>

      {showLocation && (
        <div className="descDetails">
          <div className="overLay" onClick={() => setShowLocation(false)}></div>
          <div className="descContent">
            <div className="closeBar">
              <AiOutlineCloseCircle
                className="close"
                onClick={() => setShowLocation(false)}
              />
            </div>

            <p>
              <span className="big">{aboutLocation?.slice(0, 1)}</span>
              {aboutLocation?.slice(1, aboutLocation.length - 0)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomLocaton;

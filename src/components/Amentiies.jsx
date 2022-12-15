import React, { useState } from "react";
import { bedSvgs } from "../utils/Data";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Amentiies = ({ type }) => {
  const [showAmenities, setShowAmenities] = useState(false);
  const unique = bedSvgs?.filter((id) => type?.includes(id.name));
  const notUnique = bedSvgs?.filter((id) => !type?.includes(id.name));

  return (
    <>
      <div className="amenities">
        <h2>What this place offers</h2>
        <div className="amenitiesBar">
          {unique &&
            unique?.slice(0, 10)?.map((list) => (
              <div className="amenitiesList" key={list.id}>
                <img src={list.value} alt={list.name} />
                <p>{list.name}</p>
              </div>
            ))}
        </div>

        <div className="showAmenities">
          <button onClick={() => setShowAmenities(true)}>
            Show all {unique?.length} amenities
          </button>
        </div>
      </div>

      {showAmenities && (
        <div className="showAllAmenities">
          <div
            className="overLay"
            onClick={() => setShowAmenities(false)}
          ></div>

          <div className="wrapAmen">
            <div className="closeBar">
              <AiOutlineCloseCircle
                className="close"
                onClick={() => setShowAmenities(false)}
              />
            </div>

            <div className="showAllAmenitiesContent">
              <h2>Amenities Includes</h2>
              {unique &&
                unique?.map((list) => (
                  <div className="amenitiesList" key={list.id}>
                    <img src={list.value} alt={list.name} />
                    <p>{list.name}</p>
                  </div>
                ))}
            </div>
            <div className="showAllAmenitiesContent space">
              <h2>Amenities not Includes</h2>
              {notUnique &&
                notUnique?.map((list) => (
                  <div className="amenitiesList cros" key={list.id}>
                    <img src={list.value} alt={list.name} />
                    <p>{list.name}</p>
                    <div className="cross"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Amentiies;

import React, { useState } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import imageLogo from "../assets/bed.svg";
import { bedSvgs } from "../utils/Data";
import FormFive from "./FormFive";
import { useListingContext } from "../store/listingContext";

const FormFour = ({ setShowMores }) => {
  const [showBed, setShowBed] = useState(false);
  const [showBeds, setShowBeds] = useState(false);

  const {
    uploadBedImage: uploadImage,
    isLoadingBed: isLoading,
    deleteImageBed: deleteImage,
    imageAssetBed: imageAsset,
    amenitiesType,
    setAmenitiesType,
  } = useListingContext();

  const getAnemetisData = (e) => {
    const unique = amenitiesType?.find((cl) => cl === e);
    if (unique) return;
    setAmenitiesType((prev) => [...prev, e]);
  };

  return (
    <>
      {!showBed && (
        <section className="formThreeSec bedRoom">
          <h3>Bedroom Images</h3>

          <div
            className={`imageWrap ${
              imageAsset?.length > 0 ? "imageWrapHeight" : "noIg"
            }`}
          >
            {!isLoading ? (
              <>
                {!imageAsset || imageAsset?.length === 0 ? (
                  <div className="formImage">
                    <input
                      type="file"
                      multiple
                      min="3"
                      onChange={uploadImage}
                    />
                    <img src={imageLogo} alt="logo" />
                    <p>Click Here upload 3 image Minimum</p>
                  </div>
                ) : (
                  <div className="imgList">
                    {imageAsset?.map((img, idx) => (
                      <div key={idx} className="imgLists">
                        <img src={img} alt="Pics" />
                        <button onClick={() => deleteImage(img)}>
                          <RiDeleteBin3Line />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="load">
                <p>Loading...</p>
              </div>
            )}
          </div>

          <div className="secAction">
            <button className="back" onClick={() => setShowMores(false)}>
              Back
            </button>
            <button
              className="next"
              disabled={!imageAsset || imageAsset?.length < 3}
              onClick={() => setShowBed(true)}
            >
              Next
            </button>
          </div>
        </section>
      )}

      {!showBeds && (
        <>
          {showBed && (
            <section className="bedBar">
              <div className="bedSvgBar">
                {bedSvgs.map((bed) => (
                  <div
                    className={`bedSvgList ${
                      amenitiesType?.find((cl) => cl === bed.name)
                        ? "bedActive"
                        : ""
                    }`}
                    key={bed.id}
                    onClick={() => getAnemetisData(bed.name)}
                  >
                    <img src={bed.value} alt="" />
                    <p>{bed.name}</p>
                  </div>
                ))}
              </div>

              <div className="secAction">
                <button className="back" onClick={() => setShowBed(false)}>
                  Back
                </button>
                <button
                  className="next"
                  disabled={amenitiesType.length < 5}
                  onClick={() => setShowBeds(true)}
                >
                  Next
                </button>
              </div>
            </section>
          )}
        </>
      )}

      {showBeds && <FormFive setShowBeds={setShowBeds} />}
    </>
  );
};

export default FormFour;

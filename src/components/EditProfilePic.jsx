import React from "react";
import { VscClose } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import useUploadProfile from "../hooks/useUploadProfile";
import { toast } from "react-toastify";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
// import { ref, deleteObject } from "firebase/storage";
import { db } from "../firebase/firebase.config";

const EditProfilePic = ({ setUserProfile, userActive, title }) => {
  const { uploadImage, imageAsset, deleteImage } = useUploadProfile();

  const saveChanges = async () => {
    const tempDataRef = doc(db, "users", userActive[0]?.id);

    try {
      // if (
      //   title === "userProfile" &&
      //   !userActive[0]?.photoURL.includes("googleusercontent")
      // ) {
      //   const deletRef = ref(storage, userActive[0]?.photoURL);
      //   deleteObject(deletRef).then(() => {});
      // }
      await updateDoc(tempDataRef, {
        photoURL: imageAsset,
        editedAt: serverTimestamp(),
      });
      setUserProfile(false);
    } catch (error) {
      toast.error("Something went wrong,Try again");
    }
  };

  const validate = () => {
    if (userActive[0]?.photoURL === null) {
      deleteImage();
    }
  };

  return (
    <>
      <div
        className="overLay"
        onClick={() => {
          setUserProfile(false);
          validate();
        }}
      ></div>
      <div className="editProfile">
        <div className="topBookHost">
          <VscClose
            className="vscIcon"
            onClick={() => {
              setUserProfile(false);
              validate();
            }}
          />
          <h4>Add your profile photo</h4>
        </div>

        <div className="line"></div>

        <div className="editProfileContent">
          {!imageAsset ? (
            <div className="notUserProfile">
              <FaUserAlt className="notUserIcon" />
            </div>
          ) : (
            <div>
              {imageAsset !== 1 ? (
                <img className="imgEdit" src={imageAsset} alt="" />
              ) : (
                <div className="notUserProfile">
                  <FaUserAlt className="notUserIcon" />
                </div>
              )}
            </div>
          )}

          <p>
            Pick an image that shows your face. Hosts won’t be able to see your
            profile photo until your booking is confirmed.
          </p>

          {!imageAsset && (
            <div className="editUpload">
              <label for="file-input">
                <MdCloudUpload /> Upload a photo
              </label>

              <input id="file-input" type="file" onChange={uploadImage} />
            </div>
          )}

          {imageAsset && (
            <div className="editUpload doneEdit">
              <label onClick={saveChanges}>Yes,looks good</label>
            </div>
          )}

          {imageAsset && (
            <div className="editUpload newEdit">
              <label for="file-inpu">Take a new photo</label>

              <input
                id="file-inpu"
                type="file"
                onChange={uploadImage}
                onClick={deleteImage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditProfilePic;

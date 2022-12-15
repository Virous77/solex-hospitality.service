import { useState } from "react";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase/firebase.config";
import { toast } from "react-toastify";

const useUploadProfile = () => {
  const [imageAsset, setImageAsset] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    let imageFile = !imageAsset ? e.target.files[0] : e.target.files[0];
    const storageRef = ref(storage, `Profile/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        toast.error("Something went wrong. Try again!");
        setTimeout(() => {
          toast.dismiss();
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageAsset(downloadUrl);
          setIsLoading(false);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deletRef = ref(storage, imageAsset);

    deleteObject(deletRef).then(() => {
      setImageAsset(1);
      setIsLoading(false);
    });
  };

  return {
    uploadImage,
    imageAsset,
    isLoading,
    deleteImage,
    setImageAsset,
  };
};

export default useUploadProfile;

import { createContext, useContext, useState } from "react";
import useUploadImage from "../hooks/useUploadImage";
import useUploadBedImage from "../hooks/useUploadBedImage";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./authContext";

const ListingContext = createContext();

export const ListingContextProvider = ({ children }) => {
  const initialState = {
    property: "",
    propertyType: "",
    propertyTitle: "",
    propertyAbout: "",
    propertyLocation: "",
    aboutLocation: "",
    guest: 1,
    bed: 1,
    bedroom: 1,
    bathroom: 1,
  };

  const [listing, setListing] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [amenitiesType, setAmenitiesType] = useState([]);
  const [price, setPrice] = useState(0);
  const { uploadImage, imageAsset, isLoading, deleteImage, setImageAsset } =
    useUploadImage();
  const {
    uploadImage: uploadBedImage,
    imageAsset: imageAssetBed,
    isLoading: isLoadingBed,
    deleteImage: deleteImageBed,
    setImageAsset: setBedImageAsset,
  } = useUploadBedImage();

  const { activeUser } = useAuthContext();
  const navigate = useNavigate();
  const geolocationEnabled = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setListing({ ...listing, [name]: value });
  };

  const submitListing = async () => {
    setLoading(true);

    if (imageAsset.length < 5) {
      setLoading(false);
      toast.error("Property Image must be greater than 5");
      return;
    }

    if (imageAssetBed.length < 3) {
      setLoading(false);
      toast.error("Property Bed Image must be greater than 3");
      return;
    }

    let geolocation = {};

    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${listing.propertyLocation}&key=${process.env.REACT_APP_GEOCODING_APIKEY}`
      );

      const data = await response.json();
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      if (data.status === "ZERO_RESULTS") {
        setLoading(false);
        toast.error("Please enter correct address!");
        return;
      }
    }

    const tempData = {
      listing,
      price,
      propertyImage: imageAsset,
      propertyBedImage: imageAssetBed,
      amenitiesType,
      userUid: activeUser.uid,
      createdAt: serverTimestamp(),
      geolocation,
      rating: 0,
      rateCount: 0,
    };

    try {
      await addDoc(collection(db, "property"), tempData);
      setLoading(false);
      navigate("/profile/listing");
      setListing(initialState);
      setAmenitiesType([]);
      setPrice("");
      setBedImageAsset(null);
      setImageAsset(null);
    } catch (error) {
      toast.error("Something went wrong, Try again!");
      setLoading(false);
    }
  };

  return (
    <ListingContext.Provider
      value={{
        listing,
        setListing,
        handleChange,
        uploadImage,
        imageAsset,
        isLoading,
        deleteImage,
        uploadBedImage,
        isLoadingBed,
        deleteImageBed,
        imageAssetBed,
        amenitiesType,
        setAmenitiesType,
        price,
        setPrice,
        submitListing,
        loading,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

export const useListingContext = () => useContext(ListingContext);

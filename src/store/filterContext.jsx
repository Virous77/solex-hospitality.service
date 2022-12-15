import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import useFetchCollection from "../hooks/useFetchCollection";

const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  ///NavbarPOPUP state
  const [showPopUp, setShowPopUp] = useState(false);

  const { data, loading } = useFetchCollection("property");

  const highestProperty = data
    ?.map((h) => +h.price)
    ?.reduce((acc, curr) => (acc > curr ? acc : curr), 0);

  const minPropertyPrice = data?.map((h) => h.price);
  const minPrice = Math.min(...minPropertyPrice);

  const [showFilter, setShowFilter] = useState(false);
  const [lowPrice, setLowPrice] = useState(minPrice);
  const [highPrice, setHighPrice] = useState(highestProperty);
  const [checkBox, setCheckBox] = useState("");
  const [filterdData, setFilterdData] = useState([]);
  const [type, setType] = useState("");

  const filterPrice =
    data?.map((p) => p.price)?.reduce((acc, curr) => +acc + +curr, 0) /
    data?.length;

  const submit = () => {
    const filterData = data
      ?.filter((li) => li?.listing?.propertyType?.includes(checkBox))
      ?.filter((c) => c.price >= lowPrice)
      ?.filter((z) => z.price >= lowPrice && z.price <= highPrice);

    setFilterdData(filterData);
  };

  const liveData = data
    ?.filter((li) => li?.listing?.propertyType?.includes(checkBox))
    ?.filter((c) => c.price >= lowPrice)
    ?.filter((z) => z.price >= lowPrice && z.price <= highPrice);

  const clear = () => {
    setLowPrice(minPrice);
    setHighPrice(highestProperty);
    setCheckBox("");
    setType("");
  };

  useEffect(() => {
    setFilterdData(data);
    setHighPrice(highestProperty);
    setLowPrice(minPrice);
  }, [data]);

  return (
    <FilterContext.Provider
      value={{
        showFilter,
        setShowFilter,
        checkBox,
        setCheckBox,
        highPrice,
        setHighPrice,
        lowPrice,
        setLowPrice,
        filterPrice,
        minPrice,
        highestProperty,
        submit,
        filterdData,
        data,
        setFilterdData,
        type,
        setType,
        loading,
        clear,
        liveData,
        showPopUp,
        setShowPopUp,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);

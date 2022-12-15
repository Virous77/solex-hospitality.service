import React from "react";
import { useListingContext } from "../store/listingContext";

const FormFive = ({ setShowBeds }) => {
  const { price, setPrice, submitListing, loading } = useListingContext();

  const increase = () => {
    setPrice((prev) => Number(prev) + Number(100));
  };

  const decrease = () => {
    setPrice((prev) => Number(prev) - Number(100));

    if (price === 0) {
      setPrice(0);
    }
  };

  return (
    <section className="priceSection">
      <h3>Property Price per night</h3>

      <>
        <div className="priceConta">
          <label htmlFor="price">Price(/Night)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="priceAction">
            <button onClick={decrease}>Decrease</button>
            <button onClick={increase}>Increase</button>
          </div>
        </div>
      </>

      <div className="secAction">
        <button className="back" onClick={() => setShowBeds(false)}>
          Back
        </button>
        <button
          className="next"
          disabled={price < 100 || loading}
          onClick={submitListing}
        >
          {loading ? "Saving..." : "Submit"}
        </button>
      </div>
    </section>
  );
};

export default FormFive;

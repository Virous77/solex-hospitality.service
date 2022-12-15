import React from "react";
import "../styles/Home.css";
import Card from "../components/UI/Card";
import HomeList from "../components/HomeList";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Filter from "../components/Filter";
import Empty from "../components/UI/Empty";
import home from "../assets/home.svg";
import { useFilterContext } from "../store/filterContext";
import HomeFilterBox from "../components/HomeFilterBox";
import Loader from "../components/UI/Loader";

const HomePage = () => {
  const navigate = useNavigate();

  const {
    showFilter,
    setShowFilter,
    filterdData,
    type,
    setType,
    loading,
    setShowPopUp,
  } = useFilterContext();

  const actualData = filterdData?.filter((li) =>
    li.listing.property?.includes(type)
  );

  if (loading) return <Loader />;

  return (
    <section className="homeBar" onClick={() => setShowPopUp(false)}>
      <Card>
        <Filter setType={setType} type={type} setShowFilter={setShowFilter} />
        {actualData?.length > 0 ? (
          <div className="homeContent">
            {actualData?.map((listing) => (
              <div
                className="homeList"
                key={listing.id}
                onClick={() =>
                  navigate(
                    `/rooms/${listing.listing.propertyTitle}/${listing.id}`
                  )
                }
              >
                <HomeList listing={listing} />
              </div>
            ))}
          </div>
        ) : (
          <div className="nolistingYet">
            <Empty
              image={home}
              style="home"
              title="No property yet listed in this category. Try other!"
            />
          </div>
        )}
      </Card>
      <Footer />

      {showFilter && <HomeFilterBox setShowFilter={setShowFilter} />}
    </section>
  );
};

export default HomePage;

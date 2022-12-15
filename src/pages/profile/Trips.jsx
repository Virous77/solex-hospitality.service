import React, { useEffect, useState } from "react";
import "../../styles/Trips.css";
import useFetchCollectionbyParam from "../../hooks/useFetchCollectionbyParam";
import {
  Pay,
  Upcoming,
  Cancelled,
  Completed,
  Pending,
} from "../../components/Trips/index";
import Loader from "../../components/UI/Loader";

const Trips = ({ uid }) => {
  const { data, loading } = useFetchCollectionbyParam(
    "bookUser",
    uid,
    "booking"
  );

  const pending = data?.filter((pen) => pen.booking === "pending");
  const accept = data?.filter((pen) => pen.booking === "accept");
  const upcoming = data?.filter((pen) => pen.booking === "upcoming");
  const completed = data?.filter((pen) => pen.booking === "completed");
  const cancel = data?.filter(
    (pen) => pen.booking === "cancel" && pen.cancelId === uid
  );

  const initialState = () => {
    if (pending?.length > 0 && accept?.length === 0) return "pending";
    if (accept?.length > 0 && pending?.length > 0) return "accept";
    if (pending?.length === 0 && accept?.length > 0) return "accept";
    if (pending?.length === 0 && accept?.length === 0) return "upcoming";
  };

  const [tripNav, setTripNav] = useState("");

  useEffect(() => {
    setTripNav(initialState());
  }, [data]);

  if (loading) return <Loader />;

  return (
    <section className="tripsBar">
      {!loading && (
        <div className="tripNav">
          {accept.length > 0 && (
            <p
              className={tripNav === "accept" ? "tripNavActive" : ""}
              onClick={() => setTripNav("accept")}
            >
              Accept
            </p>
          )}

          {pending.length > 0 && (
            <p
              className={tripNav === "pending" ? "tripNavActive" : ""}
              onClick={() => setTripNav("pending")}
            >
              Pending
            </p>
          )}
          <p
            className={tripNav === "upcoming" ? "tripNavActive" : ""}
            onClick={() => setTripNav("upcoming")}
          >
            Upcoming
          </p>
          <p
            className={tripNav === "completed" ? "tripNavActive" : ""}
            onClick={() => setTripNav("completed")}
          >
            Completed
          </p>
          <p
            className={tripNav === "cancel" ? "tripNavActive" : ""}
            onClick={() => setTripNav("cancel")}
          >
            Cancelled
          </p>
        </div>
      )}

      {tripNav === "accept" && <Pay accept={accept} />}
      {tripNav === "cancel" && <Cancelled cancel={cancel} />}
      {tripNav === "completed" && (
        <Completed completed={completed} upcoming={upcoming} />
      )}
      {tripNav === "pending" && <Pending pending={pending} />}
      {tripNav === "upcoming" && <Upcoming upcoming={upcoming} />}
    </section>
  );
};

export default Trips;

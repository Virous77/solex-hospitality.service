import React from "react";
import Calendar from "react-calendar";
import "../styles/Calender.css";

const BookCalander = ({ values, onChanges, setEditDate, saveChange }) => {
  return (
    <>
      <div className="overLay" onClick={() => setEditDate(false)}></div>
      <div className="bookCalander">
        <div>
          <Calendar
            onChange={onChanges}
            value={values}
            selectRange={true}
            minDate={new Date()}
          />
        </div>

        <div className="flexBook flexCla">
          <div className="closeGuest">
            <p onClick={() => setEditDate(false)}>Close</p>
          </div>

          <div className="saveChange" onClick={saveChange}>
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCalander;

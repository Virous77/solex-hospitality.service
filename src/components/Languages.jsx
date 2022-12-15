import React from "react";
import { languages } from "../utils/Data";
import { MdClose } from "react-icons/md";
import { BsCheck } from "react-icons/bs";

const Languages = ({
  setShowLang,
  setLanguages,
  languages: newLanguages,
  removeLanguages,
}) => {
  const saveLanguages = (e) => {
    const already = newLanguages?.find((li) => li === e);
    if (already) {
      setLanguages((prev) => prev.filter((item) => item !== e));

      return;
    } else {
      if (newLanguages === undefined) {
        setLanguages((prev) => [prev, e]);
      } else {
        setLanguages((prev) => [...prev, e]);
      }
    }

    if (newLanguages?.includes(undefined)) {
      newLanguages.shift();
    }
  };

  return (
    <>
      <div className="overLay" onClick={() => setShowLang(false)}></div>
      <div className="langBar">
        <div className="langTop">
          <MdClose
            cursor={"pointer"}
            size={20}
            onClick={() => setShowLang(false)}
          />
          <h4>Languages I speak</h4>
        </div>

        <div className="lanContent langpad">
          <span>
            We have many international travellers who appreciate hosts who can
            speak their language.
          </span>
          {languages?.map((lang) => (
            <div className="langList" key={lang.id}>
              <div className="langBox">
                {!newLanguages?.find((li) => li === lang.value) ? (
                  <p onClick={() => saveLanguages(lang.value)}></p>
                ) : (
                  <p className="checked">
                    <BsCheck
                      size={23}
                      onClick={() => removeLanguages(lang.value)}
                    />
                  </p>
                )}
              </div>
              <p
                style={{ cursor: "default" }}
                onClick={() => saveLanguages(lang.value)}
              >
                {lang.value}
              </p>
            </div>
          ))}

          <div className="langDone">
            <button onClick={() => setShowLang(false)}>Done</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Languages;

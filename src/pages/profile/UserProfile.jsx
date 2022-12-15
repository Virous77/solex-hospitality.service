import React, { useState } from "react";
import "../../styles/UserProfile.css";
import EditProfilePic from "../../components/EditProfilePic";
import { month } from "../../utils/function";
import { AiTwotoneStar } from "react-icons/ai";
import { MdWork, MdClose, MdSpeakerNotes } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";
import { db } from "../../firebase/firebase.config";
import { BiHomeSmile } from "react-icons/bi";
import { updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import Languages from "../../components/Languages";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const UserProfile = ({ userActive }) => {
  const [editImage, setEditImage] = useState(false);
  const [complete, setComplete] = useState(false);
  const [languages, setLanguages] = useState(userActive[0]?.languages);
  const [showLang, setShowLang] = useState(false);
  const j = languages?.filter((l) => l);

  const initialState = {
    about: userActive[0]?.about,
    work: userActive[0]?.work,
    location: userActive[0]?.location,
  };
  const [compData, setCompData] = useState(initialState);
  const { about, work, location } = compData;

  function convert(str) {
    const date = str?.toDate();
    const mnth = month[date?.getMonth()];
    return mnth + " " + date?.getFullYear();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompData({ ...compData, [name]: value });
  };

  const completeProfile = async () => {
    const tempDataRef = doc(db, "users", userActive[0]?.id);
    try {
      await updateDoc(tempDataRef, {
        about,
        work,
        location,
        editedAt: serverTimestamp(),
        profileComp: "done",
        languages: j,
      });
      setComplete(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeLanguages = (e) => {
    setLanguages((prev) => prev.filter((item) => item !== e));
  };

  return (
    <>
      <section className="userProfileBar">
        <div className="userImageBar">
          {userActive[0]?.photoURL ? (
            <img
              src={userActive[0]?.photoURL}
              alt="User"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FaUserAlt  className="userNoPPhoto" />
          )}
          <p onClick={() => setEditImage(true)}>Update photo</p>

          <h3>{userActive[0]?.firstName} Confirmed</h3>

          <div className="confirmBar">
            {userActive[0]?.profileComp === "done" && (
              <div className="confirm">
                <BsPatchCheckFill color="green" />
                <span>Profile Completed</span>
              </div>
            )}

            {userActive[0]?.location && (
              <div className="confirm">
                <BsPatchCheckFill color="green" />
                <span>Location</span>
              </div>
            )}
          </div>
        </div>
        <div className="userEditProfileBar">
          <h2>Hi, I’m {userActive[0]?.firstName}</h2>
          <span>Joined in {convert(userActive[0]?.createdAt)}</span>

          <p
            className={complete ? "notComp" : ""}
            onClick={() => setComplete(true)}
          >
            Edit profile
          </p>

          {!complete && (
            <>
              {userActive[0]?.profileComp === "done" && (
                <div className="compDoneAbout">
                  <h3>About</h3>

                  {userActive[0]?.about && (
                    <b className="userAbout">{userActive[0]?.about}</b>
                  )}

                  <div className="compDataInfoBar">
                    {userActive[0]?.location && (
                      <div className="compDataInfo">
                        <b>
                          <BiHomeSmile className="doneIcon" />
                        </b>
                        <b>
                          Lives in <span>{userActive[0]?.location}</span>
                        </b>
                      </div>
                    )}

                    {userActive[0]?.languages.length > 0 && (
                      <div className="compDataInfo">
                        <b>
                          <MdSpeakerNotes className="doneIcon" />
                        </b>
                        <b>
                          Speak{" "}
                          <span>
                            {j?.map((p, idx) => (
                              <b key={idx}>{p},</b>
                            ))}
                          </span>
                        </b>
                      </div>
                    )}

                    {userActive[0]?.work && (
                      <div className="compDataInfo">
                        <b>
                          <MdWork className="doneIcon" />
                        </b>
                        <b>
                          Work: <span>{userActive[0]?.work}</span>
                        </b>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {complete && (
            <div className="completeProfile">
              <div className="compAbout">
                <label>About</label>
                <textarea
                  cols="30"
                  rows="5"
                  value={about}
                  name="about"
                  onChange={handleChange}
                />
              </div>

              <div className="compAbout">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <b>Languages I speak</b>
                {languages?.length > 0 && (
                  <div className="lanugUserDone">
                    {languages?.map((li, idx) => (
                      <button key={idx}>
                        {li} <MdClose onClick={() => removeLanguages(li)} />
                      </button>
                    ))}
                  </div>
                )}
                <p onClick={() => setShowLang(true)}>Add more</p>
              </div>

              <div className="compAbout">
                <label>Work</label>
                <input
                  type="text"
                  name="work"
                  value={work}
                  onChange={handleChange}
                />
              </div>

              <div className="compAction">
                <p onClick={() => setComplete(false)}>Cancel</p>

                <button onClick={completeProfile}>Save</button>
              </div>

              <div className="line"></div>
            </div>
          )}

          <div className="reviewsCountBar">
            <h2 className="reviewsCount">
              <AiTwotoneStar /> {userActive[0]?.reviews?.length || 0} Review
            </h2>

            <div className="line lineWidth"></div>

            <p>
              <Link to="/profile/reviews">Reviews by you</Link>
            </p>
          </div>
        </div>
      </section>

      {editImage && (
        <EditProfilePic
          userActive={userActive}
          setUserProfile={setEditImage}
          title="userProfile"
        />
      )}

      {showLang && (
        <Languages
          setShowLang={setShowLang}
          languages={languages}
          setLanguages={setLanguages}
          removeLanguages={removeLanguages}
        />
      )}
    </>
  );
};

export default UserProfile;

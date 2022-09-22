import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./FollowingModal.scss";
import profileApis from "../../utils/profile";

function FollowingModal({ followees, profileInViewUsername, page }) {
  const [show, setShow] = useState(false);
  // const [usersHairLength, setUsersHairLength] = useState([]);

  // useEffect(() => {
  //   console.log("followees changing", followees);
  // }, [followees]);

  useEffect(() => {
    setShow(false);
    // const fetchUsersGender = async () => {
    //   try {
    //     const hairLengths = await Promise.all(
    //       followees.map(async (followee) => {
    //         const gender = await profileApis.getGender(followee);
    //         console.log("followee", followee);
    //         console.log("gender", gender);
    //         const hairLength = gender.data.gender === "female" ? "longHair" : "shortHair";
    //         return hairLength;
    //       })
    //     );

    //     setUsersHairLength([...hairLengths]);
    //   } catch (err) {
    //     setUsersHairLength(Array(followees.length).fill("shortHair"));
    //   }
    // };
    // fetchUsersGender();
  }, [profileInViewUsername]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log("users hair length", usersHairLength);

  return (
    <>
      {page === "profile-page" ? (
        <h5 key={followees} className="mt-5" onClick={handleShow}>
          Following {followees && followees.length} user(s)
        </h5>
      ) : (
        <div key={followees} onClick={handleShow}>
          Following {followees && followees.length} user(s)
        </div>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Following</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {followees ? (
              followees.map((followee, idx) => (
                <li key={followee}>
                  <Link
                    to={"/profiles/" + followee}
                    onClick={handleClose}
                    style={{ textDecoration: "none" }}>
                    <img
                      className="navbar-avatar"
                      src={`https://avatars.dicebear.com/api/avataaars/${followee}.svg?size=50&radius=50`}></img>

                    {followee}
                  </Link>
                  {/* <a href={"/profiles/" + followee}>{followee}</a> */}
                </li>
              ))
            ) : (
              <></>
            )}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FollowingModal;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./FollowingModal.scss"

function FollowingModal({ followees, profileInViewUsername, page }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [profileInViewUsername]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {page === "profile-page" ? (
          <h5 className="mt-5" onClick={handleShow}>
            Following {followees && followees.length} user(s)
          </h5>
        ) : (
          <div onClick={handleShow}>
          Following {followees && followees.length} user(s)
          </div>
        )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Following</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {followees &&
              followees.map((followee) => (
                <li key={followee}>
                  <Link to={"/profiles/" + followee} onClick={handleClose} style={{ textDecoration: "none" }}><img src={`https://avatars.dicebear.com/api/avataaars/${followee}.svg?size=50&radius=50`}></img>{followee}</Link>
                  {/* <a href={"/profiles/" + followee}>{followee}</a> */}
                </li>
              ))}
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

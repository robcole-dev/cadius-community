import React from "react";
import styles from "../../css/Profile.module.css";
import btnStyles from "../../css/Button.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import ProfileImage from "../../components/ProfileImage";
import { Button } from "react-bootstrap";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, profile_image, username } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === username;


  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={ProfileImage} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{username}</strong>
      </div>
    </div>
  );
};

export default Profile;
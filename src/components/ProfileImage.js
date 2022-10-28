import React from "react";
import styles from "../css/ProfileImage.module.css";

const ProfileImage = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.ProfileImage}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default ProfileImage;
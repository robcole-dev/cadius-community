import React, { useState } from 'react';
import { Button, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileImage from '../../components/ProfileImage';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import styles from "../../css/Comment.module.css";
import btnStyles from "../../css/Button.module.css";
import { axiosRes } from '../../api/axiosDefaults';
import CommentEditForm from "./CommentEditForm";


const Comment = (props) => {
  const { author_id, author_image, author, last_modified, description,
    id, setComments } = props;
  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_author = currentUser?.username === author;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}`);
      setComments(prevComments => ({
        ...prevComments,
        results: prevComments.results.filter(comment => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div>
      <hr />
      <Media>
        <Link to={`/profiles/${author_id}`}>
          <ProfileImage src={author_image} />
        </Link>
        <Media.Body className='align-self-center ml-2'>
          <span className={styles.Owner}>{author}</span>
          <span className={styles.Date}>{last_modified}</span>
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={author_id}
              description={description}
              profileImage={author_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm} />
          ) : (
            <p className={styles.Description}>{description}</p>
          )}
        </Media.Body>
        {is_author && (
          <>
            <Button className={btnStyles.Button} onClick={() => setShowEditForm(true)}>Edit</Button>
            <Button className={btnStyles.Button} onClick={handleDelete}>Delete</Button>
          </>
        )}
      </Media>
    </div>

  );
};

export default Comment;

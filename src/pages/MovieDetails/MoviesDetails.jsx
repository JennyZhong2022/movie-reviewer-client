import { useState, useContext, useEffect } from "react";
import styles from "./MovieDetails.module.scss";
import { AuthContext } from "../../context/AuthContextProvider";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetails = ({ movie, directors, actors }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://movie-reviewer-0rv9.onrender.com/api/movies/${id}/comments`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        const data = await response.json();

        setComments(data.comments);
        console.log("comments", data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const handleTextareaToggle = () => {
    if (!isAuthenticated) {
      return navigate("/sign-in");
    }
    setOpen(!open);
  };

  const handleCommentSubmit = async () => {
    if (!commentText) return;

    try {
      const response = await fetch(`/api/movies/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentText }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const data = await response.json();
      console.log("Comment submitted:", data);

      setComments((prevComments) => [...prevComments, data.comment]);
      setCommentText("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>

      <div className={styles.movieDetailsSection}>
        <div className={styles.leftSide}>
          <img
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={`${movie.title} backdrop poster`}
          />
        </div>

        <div className={styles.rightSide}>
          <h1>Overview</h1>
          <p>{movie.overview}</p>

          <h2>Director</h2>
          {directors.map((director) => (
            <p key={director.id}>{director.name}</p>
          ))}

          <h2>Lead Actors</h2>
          {actors.map((actor) => (
            <span key={actor.id}>{actor.name}</span>
          ))}
        </div>
      </div>

      <div className={styles.movieReviewSection}>
        <button onClick={handleTextareaToggle}>I want to write a review</button>
        {open && (
          <>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write your comment here..."
            ></textarea>
            <button onClick={handleCommentSubmit}>Submit</button>
          </>
        )}
      </div>

      {/* Comments Section */}
      <div className={styles.commentsSection}>
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              <p>{comment.commentText}</p>{" "}
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;

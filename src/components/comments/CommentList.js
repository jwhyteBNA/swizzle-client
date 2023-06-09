import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments, createComment, getCommentsByPostId, getPostComments, deleteComment } from "../../managers/CommentManager";

export const CommentList = () => {
    const [comments, setComments] = useState([])
    const { postId } = useParams()
    const [comment, setComment] = useState({ 
        content: "",
        image_url: "",
        created_on: new Date().toISOString().slice(0, 10),
        mixologist: "",
        post: postId
    })

    const getFilteredComments = () => {
        getCommentsByPostId(postId)
        .then((commentData) => {
            setComments(commentData);
    })}

    useEffect(() => {
        getFilteredComments()
    }, [postId]);


    const handleInputChange = (event) => {
        const newComment = { ...comment };
        newComment[event.target.name] = event.target.value;
        setComment(newComment);
    };

    const saveComment = () => {
        
        const newComment = {
            content: comment.content,
            created_on: comment.created_on,
            author: parseInt(comment.author),
            post: parseInt(comment.post)
        };

        createComment(newComment)
            .then(() => {
                getFilteredComments()
        })
    }

    const handleDeleteComment = (commentId) => {
        if(window.confirm("Are you sure you want to delete this comment?")) {
            deleteComment(commentId)
            .then(() => {
                getFilteredComments()
            })
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="content">New Comment: </label>
                <input
                    type="text"
                    name="content"
                    value={comment.content}
                    onChange={handleInputChange}
                />
                <button type="button" onClick={saveComment}>
                    Save Comment
                </button>
            </form>
            <h2>Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.content}</p>
                    <p>{comment.author.user.username}</p>
                    <p>{comment.created_on}</p>
                    <img className="action__button" src="/trashcan.png" onClick={() => handleDeleteComment(comment.id)}></img>
                    {/* Display additional information about the comment here */}
                </div>
            ))}
        </div>
    );
};
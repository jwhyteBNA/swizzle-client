import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createComment, getCommentsByRecipeId, deleteComment } from "../../managers/CommentManager";
import "./comment.css"

export const CommentList = () => {
    const [comments, setComments] = useState([])
    const { recipeId } = useParams()
    const [comment, setComment] = useState({ 
        content: "",
        image_url: "",
        created_on: new Date().toISOString().slice(0, 10),
        mixologist: "",
        recipe: recipeId
    })

    const getFilteredComments = () => {
        getCommentsByRecipeId(recipeId)
        .then((commentData) => {
            setComments(commentData);
    })}

    useEffect(() => {
        getFilteredComments()
    }, [recipeId]);


    const handleInputChange = (event) => {
        const newComment = { ...comment };
        newComment[event.target.name] = event.target.value;
        setComment(newComment);
    };

    const saveComment = () => {
        
        const newComment = {
            content: comment.content,
            image_url: comment.image_url,
            created_on: comment.created_on,
            mixologist: parseInt(comment.mixologist),
            recipe: parseInt(comment.recipe)
        };

        createComment(newComment)
            .then(() => {
                getFilteredComments()
        })
    }

    const handleDeleteComment = (commentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this comment?");
        if (confirmed) {
            deleteComment(commentId)
            .then(() => {
                getFilteredComments()
            })
        }
    }

    return (
        <div>
            <form className="comment_form">
                <h3 htmlFor="content">New Comment: </h3>
                <textarea
                    className="comment_form_input"
                    type="text"
                    name="content"
                    value={comment.content}
                    placeholder="Comment"
                    onChange={handleInputChange}
                />
                <input
                    className="comment_form_input"
                    type="text"
                    name="image_url"
                    value={comment.image_url}
                    placeholder="Image Link"
                    onChange={handleInputChange}
                />
                <button className="comment_btn" type="button" onClick={saveComment}>
                    Save Comment
                </button>
            </form>

            <h2>Comments</h2>
            <div className="comment_container">
            {comments.map((comment) => (
                <div key={comment.id}>
                    <img src={comment?.image_url}/>
                    <p>{comment.content}</p>
                    <h4>{comment.mixologist.user.username}</h4>
                    <h4>{comment.created_on}</h4>
                    {comment.can_edit ? 
                    <img className="action__button" src="/trashcan.png" onClick={() => handleDeleteComment(comment.id)}></img> 
                    :
                    ""
                    }
                    
                </div>
            ))}
            </div>
        </div>
    );
};
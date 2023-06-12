export const getComments = () => {
    return fetch("http://localhost:8000/comments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getRecipeComments = (recipeId) => {
    return fetch(`http://localhost:8000/comments/recipecomments/${recipeId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getCommentsByRecipeId = (recipeId) => {
    return fetch(`http://localhost:8000/comments?recipe_id=${recipeId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const createComment = (comment) => {
    return fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
        .then(response => response.json())
}

export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}
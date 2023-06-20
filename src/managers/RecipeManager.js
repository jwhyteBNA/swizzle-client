export const getRecipes = () => {
    return fetch("http://localhost:8000/recipes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getExactRecipe = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const publishRecipe = (recipeToPublish) => {
    return fetch("http://localhost:8000/recipes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(recipeToPublish)
    })
        .then(res => res.json())
}

export const deleteRecipe = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
}

export const updateRecipeDetails = (recipe) => {
    return fetch(`http://localhost:8000/recipes/${recipe.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(recipe)
    })
}

export const getMyRecipes = () => {
    return fetch("http://localhost:8000/recipes/myrecipes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getMySubscriptions = () => {
    return fetch("http://localhost:8000/recipes/mysubscriptions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const filterRecipesByMixologist = (mixologistId) => {
    return fetch(`http://localhost:8000/recipes?mixologist=${mixologistId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const filterRecipesByCategory = (categoryId) => {
    return fetch(`http://localhost:8000/recipes?category=${categoryId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const filterRecipesBySearch = (searchTerm) => {
    return fetch(`http://localhost:8000/recipes?search=${searchTerm}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const filterRecipesByTag = (tagId) => {
    return fetch(`http://localhost:8000/recipes?tag=${tagId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const getSubscriptions = () => {
    return fetch("http://localhost:8000/recipes/mysubscriptions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteRecipeAsFave = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}/unfavorite`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      },
    });
  };
  
  export const markRecipeAsFave = (recipeId) => {
    return fetch(`http://localhost:8000/recipes/${recipeId}/favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      },
      body: JSON.stringify(recipeId),
    }).then((res) => res.json());
  };

  export const getMyFavorites = () => {
    return fetch("http://localhost:8000/recipes?is_favorite=True", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("auth_token")}`
        }
    })
        .then(response => response.json())
}
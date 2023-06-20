import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteRecipe, getMySubscriptions } from "../../managers/RecipeManager"

export const MySubscriptions = () => {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMySubscriptions().then(myRecipeData => {
        const sortedData = myRecipeData.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
        setRecipes(sortedData)
        })
    }, [])

    const handleDeleteRecipe = (recipeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmed) {
            deleteRecipe(recipeId)
            .then(() => {
                getMySubscriptions().then((myRecipeData) => setRecipes(myRecipeData))
            })
        }    
    }

    return <>
    <article className="recipes">
    {
        recipes.map(recipe => {
            return <section key={`recipe--${recipe.id}`} className="recipe">
                <section className="recipe__header">
                    <h3 className="recipe__title" onClick={() => navigate(`/recipes/${recipe.id}`)}>{recipe.name}</h3>
                    <div className="recipe__publication_date"> {recipe.publication_date}</div>
                </section>
                <img className="recipe__image" src={recipe.image_url} onClick={() => navigate(`/recipes/${recipe.id}`)}></img>
                <section className="recipe__footer">
                    <div className="recipe__author" onClick={() => navigate(`/users/${recipe.mixologist.user.id}`)}>Mixologist: <b>{recipe.mixologist.user.username}</b></div>
                    <section className="reaction__buttons">
                </section>
                </section>
            </section>
        })
    }
</article>
    </>
}
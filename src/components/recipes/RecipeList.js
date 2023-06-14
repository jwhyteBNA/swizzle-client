import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Recipes.css"
import { deleteRecipe, getRecipes } from "../../managers/RecipeManager"

export const RecipeList = () => {
    const [ recipes, setRecipes ] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getRecipes().then(recipeData => {
        const sortedData = recipeData.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
        setRecipes(sortedData)
        })
    }, [])

    const handleDeleteRecipe = (recipeId) => {
        if(window.confirm("Are you sure you want to delete this recipe?")) {
            deleteRecipe(recipeId)
            .then(() => {
                getRecipes().then((recipeData) => setRecipes(recipeData))
            })
        }
    }


    return <>
    <article className="add__home_recipes">
        <button className="add__recipes_button" onClick={() => {
            navigate({ pathname: "/recipes/publish" })
            }}>Add 🧉</button>
    </article>
    <article className="recipes">
    {
        recipes.map(recipe => {
            return <section key={`recipe--${recipe.id}`} className="recipe">
                <section className="recipe__header">
                    <div className="recipe__name" onClick={() => navigate(`/recipes/${recipe.id}`)}>{recipe.name}</div>
                    <div className="recipe__publication_date"> {recipe.publication_date}</div>
                </section>
                <img className="recipe__image" src={recipe.image_url} onClick={() => navigate(`/recipes/${recipe.id}`)}></img>
                <section className="recipe__footer">
                    <div className="recipe__author" onClick={() => navigate(`/users/${recipe.user.user.id}`)}>Mixologist: <b>{recipe.mixologist.user.username}</b></div>
                    <section className="reaction__buttons">
                </section>
                </section>
                {recipe.can_edit ?
                <>
                <section className="action__buttons_container">
                <img className="action__button" src="gear.png" onClick={() => navigate(`/recipes/${recipe.id}/edit`)}></img>
                <img className="action__button" src="trashcan.png" onClick={() => {handleDeleteRecipe(recipe.id)}}></img>
                </section>
                </>
                :
                ""
                }    
            </section>
        })
    }
</article>
</>
}
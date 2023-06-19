import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteRecipe, getMyRecipes } from "../../managers/RecipeManager"

export const MyRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getMyRecipes().then(myRecipeData => {
        const sortedData = myRecipeData.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
        setRecipes(sortedData)
        })
    }, [])

    const handleDeleteRecipe = (recipeId) => {
        const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmed) {
            deleteRecipe(recipeId)
            .then(() => {
                getMyRecipes().then((myRecipeData) => setRecipes(myRecipeData))
            })
        }    
    }

    return <>
        <article className="add__home_recipes">
        <button className="button_save" onClick={() => {
            navigate({ pathname: "/recipes/publish" })
            }}>Add 🧉</button>
    </article>
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
                <section className="action__buttons_container">
                    <img className="action__button" src="../gear.png" onClick={() => navigate(`/recipes/${recipe.id}/edit`)}></img>
                    <img className="action__button" src="../trashcan.png" onClick={() => {handleDeleteRecipe(recipe.id)}}></img>
                </section>
            </section>
        })
    }
</article>
    </>
}
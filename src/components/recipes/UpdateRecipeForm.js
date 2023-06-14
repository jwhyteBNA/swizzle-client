import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getTags } from "../../managers/TagManager"
import { getExactRecipe, updateRecipeDetails } from "../../managers/RecipeManager"

export const UpdateRecipeForm = () => {
    const navigate = useNavigate()
    const { recipeId } = useParams()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [recipe, updateRecipe] = useState({
        title: "",
        publication_date: "",
        image_url: "",
        original_link: "",
        ingredients: "",
        directions: "",
        notes: "",
        approved: true,
        category: "",
        tag: []
    })

    useEffect(
        () => {
            getExactRecipe(recipeId)
                .then((recipeData) => {
                    const recipeObject = recipeData
                    recipeObject.name = recipeData.name
                    recipeObject.publication_date = recipeData.publication_date
                    recipeObject.image_url = recipeData.image_url
                    recipeObject.original_link = recipeData.original_link
                    recipeObject.ingredients = recipeData.ingredients
                    recipeObject.directions = recipeData.directions
                    recipeObject.notes = recipeData.notes
                    recipeObject.servings = recipeData.servings
                    recipeObject.approved = recipeData.approved
                    recipeObject.category = recipeData.category.id
                    recipeObject.tag = recipeData.tag.map((tag) => tag.id)
                    updateRecipe(recipeObject)
                })
        },
        [recipeId]
    )

    useEffect(
        () => {
            getCategories()
                .then((res) => setCategories(res))
        },
        []
    )

    useEffect(
        () => {
            getTags()
                .then((res) => setTags(res))
        },
        []
    )

    const changeRecipeState = (domEvent) => {
        const copy = {...recipe}
        copy[domEvent.target.name] = domEvent.target.value
        updateRecipe(copy)
        }

    const handleCheckbox = (evt) => {
        const { checked, value } = evt.target;
        const copy = {...recipe}
        if (checked) {
            copy.tag.push(parseInt(value))
            updateRecipe(copy)     
        } else {
            copy.tag = copy.tag.filter(tag => tag !== parseInt(value))
            updateRecipe(copy)
        }
    };

    return <>
    <form className="update_recipe">
        <h2 className="update__recipe_header">Recipe Details:</h2>
        <fieldset>
            <div className="form-group">
                <label className="update__recipe_name" htmlFor="name">Name:</label>
                <input
                    name="name"
                    required autoFocus
                    type="text"
                    className="form-control-name"
                    value={recipe.name}
                    onChange={changeRecipeState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="image_url">Image URL:</label>
                <input
                    name="image_url"
                    required autoFocus
                    type="text"
                    className="form-control-image"
                    value={recipe.image_url}
                    onChange={changeRecipeState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="original_link">Original Recipe Link:</label>
                <input
                    name="original_link"
                    required autoFocus
                    type="text"
                    placeholder="Optional"
                    className="form-control-image"
                    value={recipe.original_link}
                    onChange={changeRecipeState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="ingredients">Ingredients:</label>
                <textarea
                    name="ingredients"
                    required autoFocus
                    type="text"
                    className="form-control-ingredients"
                    value={recipe.ingredients}
                    onChange={changeRecipeState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="directions">directions:</label>
                <textarea
                    name="directions"
                    required autoFocus
                    type="text"
                    className="form-control-content"
                    value={recipe.directions}
                    onChange={changeRecipeState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="notes">Notes:</label>
                <textarea
                    name="notes"
                    required autoFocus
                    type="text"
                    className="form-control-notes"
                    value={recipe.notes}
                    onChange={changeRecipeState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="servings">Servings:</label>
                <input
                    name="servings"
                    required autoFocus
                    type="number"
                    className="form-control-servings"
                    value={recipe.servings}
                    onChange={changeRecipeState}/>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <select
                    name="category"
                    required autoFocus
                    className="form-control-category"
                    value={recipe.category}
                    onChange={changeRecipeState}>
                    {categories.map(category => 
                        <option key={`category--${category.id}`} value={category.id}>{category.name}</option>
                    )}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
            <label htmlFor="tag">Tags:</label>
                    <div className="input__field">
                            {tags.map((tag) => (
                                <label key={tag.id} className="checkbox">
                                    <input
                                        type="checkbox"
                                        name="tag"
                                        required
                                        checked={recipe.tag.includes(tag.id)}
                                        className="form-control-tag"
                                        value={tag.id}
                                        onChange={handleCheckbox}/>
                                        {tag.label}
                                </label>
                                ))}
                        </div>
            </div>
        </fieldset>
        <button className="btn btn-save"
        onClick={evt => {
            evt.preventDefault()
            
            const updatedRecipe = {
                id: recipeId,
                name: recipe.name,
                publication_date: recipe.publication_date,
                image_url: recipe.image_url,
                original_link: recipe.original_link,
                ingredients: recipe.ingredients,
                directions: recipe.directions,
                notes: recipe.notes,
                servings: recipe.servings,
                approved: recipe.approved,
                category: parseInt(recipe.category),
                tag: recipe.tag
            }

            updateRecipeDetails(updatedRecipe)
            .then(() => navigate("/recipes"))}}>
            Save
        </button>
    </form>
</>
}

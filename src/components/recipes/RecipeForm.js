import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getTags } from "../../managers/TagManager"
import { publishRecipe } from "../../managers/RecipeManager"

export const RecipeForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [recipe, updateRecipe] = useState({
        name: "",
        publication_date: new Date().toISOString().slice(0, 10),
        image_url: "",
        original_link:"",
        ingredients: "",
        directions: "",
        notes: "",
        servings: "",
        approved: "",
        category: "",
        tag: []
    })

    useEffect(
        () => {
            getCategories()
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
        },
        []
    )

    useEffect(
        () => {
            getTags()
                .then((tagsArray) => {
                    setTags(tagsArray)
                })
        },
        []
    )

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

    const publishButton = (event) => {
        event.preventDefault()

        const recipeToPublish = {
            name: recipe.name,
            publication_date: recipe.publication_date,
            image_url: recipe.image_url,
            original_link: recipe.original_link,
            ingredients: recipe.ingredients,
            directions: recipe.directions,
            notes: recipe.notes,
            servings: recipe.servings,
            approved: true,
            category: parseInt(recipe.category),
            tag: recipe.tag
        }

        return publishRecipe(recipeToPublish)
            .then((recipe) => {
                navigate(`/recipes/${recipe.id}`)
            })
    }

    return <>
            <h2 className="RecipeForm__title">New Recipe</h2>
            <form className="recipeForm">
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <input
                                required autoFocus
                                type="text"
                                className="form-control-title"
                                placeholder="Name"
                                value={recipe.name}
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.name = evt.target.value
                                        updateRecipe(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <input
                                required autoFocus
                                type="text"
                                className="form-control-image"
                                placeholder="Image URL"
                                value={recipe.image_url}
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.image_url = evt.target.value
                                        updateRecipe(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <input
                                required autoFocus
                                type="text"
                                className="form-control-image"
                                placeholder="Original Link, Optional"
                                value={recipe.original_link}
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.original_link= evt.target.value
                                        updateRecipe(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <textarea
                                required autoFocus
                                type="text"
                                className="form-control-content"
                                placeholder="Ingredients"
                                value={recipe.ingredients}
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.ingredients = evt.target.value
                                        updateRecipe(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <textarea
                                required autoFocus
                                type="text"
                                className="form-control-content"
                                placeholder="directions"
                                value={recipe.directions}
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.directions = evt.target.value
                                        updateRecipe(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <textarea
                                required autoFocus
                                type="text"
                                className="form-control-content"
                                placeholder="Notes"
                                value={recipe.notes}
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.notes = evt.target.value
                                        updateRecipe(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <input
                                required autoFocus
                                type="number"
                                className="form-control-content"
                                placeholder="Servings"
                                value={recipe.servings}
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.servings = evt.target.value
                                        updateRecipe(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <select
                                value={recipe.category}
                                className="form-control-category"
                                onChange={
                                    (evt) => {
                                        const copy = { ...recipe }
                                        copy.category = evt.target.value
                                        updateRecipe(copy)
                                    }
                                } > <option value="">Choose Category</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}: {category.description}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                                {tags.map((tag) => (
                                    <label key={tag.id} className="checkbox">
                                        <input
                                            type="checkbox"
                                            name="tag"
                                            className="form-control-tag"
                                            value={tag.id}
                                            onChange={handleCheckbox}
                                            />
                                            {tag.label}
                                    </label>
                                    ))}
                            </div>
                        </div>
                </fieldset>

                <button
                    onClick={(clickEvent) => {
                        publishButton(clickEvent)}}
                    className="btn-publish"><b>
                        Publish
                    </b></button>
            </form>
        </>
}
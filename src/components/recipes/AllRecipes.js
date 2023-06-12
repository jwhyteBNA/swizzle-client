import { useEffect, useState } from "react"
import "./Recipes.css"
import { Link, useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getUsers } from "../../managers/UserManager"
import { getTags } from "../../managers/TagManager"
import { filterRecipesByCategory, filterRecipesByMixologist, filterRecipesBySearch, filterRecipesByTag, getRecipes } from "../../managers/RecipeManager"

export const AllRecipes = () => {
    const [recipes, setRecipes] = useState([])
    const [categories, setCategories] = useState([])
    const [mixologists, setMixologists] = useState([])
    const [tags, setTags] = useState([])
    const [ingredients, setIngredients] =useState([])
    const [measurements, setMeasurements] = useState([])
    const [filterByMixologist, setFilterByMixologist] = useState()
    const [filterByCategory, setFilterByCategory] = useState()
    const [filterByTag, setFilterByTag] = useState()
    const [ filterBySearch, setFilterBySearch ] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getRecipes().then(recipeData => setRecipes(recipeData))
    }, [])

    useEffect(() => {
        getRecipes().then(recipeData => {
            const sortedData = recipeData.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
            setRecipes(sortedData)
        })
    }, [])

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
                .then((tagArray) => {
                    setTags(tagArray)
                })
        },
        []
    )

    useEffect(
        () => {
            getUsers()
                .then((userArray) => {
                    setMixologists(userArray)
                })
        },
        []
    )

    useEffect(
        () => {
            if (filterByCategory) {
                filterRecipesByCategory(filterByCategory)
                    .then((filteredData) => setRecipes(filteredData))
            }
        }, [filterByCategory]
    )

    useEffect(
        () => {
            if (filterByMixologist) {
                filterRecipesByMixologist(filterByMixologist)
                    .then((filteredData) => setRecipes(filteredData))
            }
        }, [filterByMixologist]
    )

    useEffect(
        () => {
            if (filterByTag) {
                filterRecipesByTag(filterByTag)
                    .then((filteredData) => setRecipes(filteredData))
            }
        }, [filterByTag]
    )

    useEffect(
        () => {
            if (filterBySearch) {
                filterRecipesBySearch(filterBySearch)
                    .then((filteredData) => setRecipes(filteredData))
            }
        }, [filterBySearch]
    )


    return <>
        <section>
            <select
                value={filterByCategory}
                onChange={(evt) => setFilterByCategory(evt.target.value)}>
                <option value="">Category Select</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.label}
                    </option>
                ))}
            </select>
        </section>
        <section>
            <select
                value={filterByMixologist}
                onChange={(evt) => setFilterByMixologist(evt.target.value)}>
                <option value="">Author Select</option>
                {mixologists.map((mixologist) => (
                    <option key={mixologist.id} value={mixologist.id}>
                        {mixologist.username}
                    </option>
                ))}
            </select>
        </section>
        <section>
            <select
                value={filterByTag}
                onChange={(evt) => setFilterByTag(evt.target.value)}>
                <option value="">Tag Select</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.label}
                    </option>
                ))}
            </select>
        </section>
        <section>
            <input type="text" placeholder="Enter text" onChange={
                (changeEvent => {
                    setFilterBySearch(changeEvent.target.value)
                })
            } />
        </section>
        <article className="add__recipes">
            <button className="add__recipes_button" onClick={() => {
                navigate({ pathname: "/recipes/publish" })
            }}>+</button>
        </article>
        <section className="recipes__grid">
            <div className="grid__header">Name</div>
            <div className="grid__header">Created By Mixologist</div>
            <div className="grid__header">Date</div>
            <div className="grid__header">Category</div>
            <div className="grid__header">Tags</div>
        </section>
        {
            recipes.map(recipe => {
                return <>
                    <section className="grid__items" key={`recipe--${recipe.id}`}>
                        <Link className="recipe__titles" to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                        <div className="recipe__mixologists" onClick={() => navigate(`/users/${recipe.mixologist.user.id}`)}>{recipe.mixologist.user.username}</div>
                        <div className="recipe__dates">{recipe.publication_date}</div>
                        <div className="recipe__categories">{recipe.category.label}</div>
                        <div className="recipe__tags">
                        {recipe.tag?.map((tag) => {
                            return <div key={tag.id}>{tag.label}</div>
                        })}
                        </div>
                    </section>
                </>
            })
        }
    </>
}
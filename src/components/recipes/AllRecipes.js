import { useEffect, useState } from "react";
import "./Recipes.css";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../managers/CategoryManager";
import { getTags } from "../../managers/TagManager";
import { getMixologists } from "../../managers/UserManager";
import {
  filterRecipesByCategory,
  filterRecipesByMixologist,
  filterRecipesBySearch,
  filterRecipesByTag,
  getRecipes,
} from "../../managers/RecipeManager";

export const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mixologists, setMixologists] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterByMixologist, setFilterByMixologist] = useState();
  const [filterByCategory, setFilterByCategory] = useState();
  const [filterByTag, setFilterByTag] = useState();
  const [filterBySearch, setFilterBySearch] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes().then((recipeData) => setRecipes(recipeData));
  }, []);

  useEffect(() => {
    getRecipes().then((recipeData) => {
      const sortedData = recipeData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setRecipes(sortedData);
    });
  }, []);

  const getAllRecipes = () => {
    getRecipes().then((recipeData) => {
      const sortedData = recipeData.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setRecipes(sortedData);
    });
  }

  useEffect(() => {
    getCategories().then((categoryArray) => {
      setCategories(categoryArray);
    });
  }, []);

  useEffect(() => {
    getTags().then((tagArray) => {
      setTags(tagArray);
    });
  }, []);

  useEffect(() => {
    getMixologists().then((userArray) => {
      setMixologists(userArray);
    });
  }, []);

  useEffect(() => {
    if (filterByCategory) {
      filterRecipesByCategory(filterByCategory).then((filteredData) =>
        setRecipes(filteredData)
      );
    }
  }, [filterByCategory]);

  useEffect(() => {
    if (filterByMixologist) {
      filterRecipesByMixologist(filterByMixologist).then((filteredData) =>
        setRecipes(filteredData)
      );
    }
  }, [filterByMixologist]);

  useEffect(() => {
    if (filterByTag) {
      filterRecipesByTag(filterByTag).then((filteredData) =>
        setRecipes(filteredData)
      );
    }
  }, [filterByTag]);

  useEffect(() => {
    if (filterBySearch) {
      filterRecipesBySearch(filterBySearch).then((filteredData) =>
        setRecipes(filteredData)
      );
    }
  }, [filterBySearch]);

  const handleMixologistChange = (evt) => {
    const selectedValue = evt.target.value;
    if (selectedValue === "") {
      getAllRecipes()
      setFilterByMixologist("")
    } 
    else {
      setFilterByMixologist(selectedValue);
    }
  };

  const handleCategoryChange = (evt) => {
    const selectedValue = evt.target.value;
    if (selectedValue === "") {
      getAllRecipes()
      setFilterByCategory("")
    } 
    else {
      setFilterByCategory(selectedValue);
    }
  };

  const handleTagChange = (evt) => {
    const selectedValue = evt.target.value;
    if (selectedValue === "") {
      getAllRecipes()
      setFilterByTag("")
    } 
    else {
      setFilterByTag(selectedValue);
    }
  };

  return (
    <>
    <div className="select_filters">
    <section>
        <select
          value={filterByMixologist}
          onChange={handleMixologistChange}
        >
          <option value="">Select Mixologist</option>
          {mixologists.map((mixologist) => (
            <option key={`mixologist--${mixologist.id}`} value={mixologist.id}>
              {mixologist.user.username}
            </option>
          ))}
        </select>
      </section>
      <section>
        <select
          value={filterByCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={`category--${category.id}`} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </section>
      <section>
        <select
          value={filterByTag}
          onChange={handleTagChange}
        >
          <option value="">Tag Select</option>
          {tags.map((tag) => (
            <option key={`tag--${tag.id}`} value={tag.id}>
              {tag.label}
            </option>
          ))}
        </select>
      </section>
      </div>
      <section className="search_filter">
        <input
          className="searchbox"
          type="text"
          placeholder="Search by Ingredient"
          onChange={(changeEvent) => {
            setFilterBySearch(changeEvent.target.value);
          }}
        />
      </section>
      <article className="add__recipes">
        <button
          className="button_save"
          onClick={() => {
            navigate({ pathname: "/recipes/publish" });
          }}
        >
          Add 🧉
        </button>
      </article>
      <section className="grid_of_recipes">
      <section className="recipes__grid">
        <div className="grid__header">Name</div>
        <div className="grid__header">Added By</div>
        <div className="grid__header">Category</div>
        <div className="grid__header">Tags</div>
      </section>
      {recipes.map((recipe) => {
        return (
            <section className="grid__items" key={`recipe--${recipe.id}`}>
              <Link className="recipe__titles" to={`/recipes/${recipe.id}`}>
                {recipe.name}
              </Link>
              <div
                className="recipe__mixologists"
                onClick={() => navigate(`/users/${recipe.mixologist.user.id}`)}
              >
                {recipe.mixologist.user.username}
              </div>
              <div className="recipe__categories">{recipe.category.name}</div>
              <div className="recipe__tags">
                {recipe.tag?.map((tag) => tag.label).join(", ")}
              </div>
            </section>
            
        );
      })}
      </section>
    </>
  );
};

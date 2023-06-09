import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Recipes.css";
import {
  deleteRecipe,
  deleteRecipeAsFave,
  getRecipes,
  markRecipeAsFave,
} from "../../managers/RecipeManager";
import { FaStar, FaRegStar, FaTrashAlt, FaRegEdit } from "react-icons/fa";
import { Intro } from "./Explainer";

export const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes().then((recipeData) => {
      const sortedData = recipeData.sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );
      setRecipes(sortedData);
    });
  }, []);

  const handleDeleteRecipe = (recipeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmed) {
      deleteRecipe(recipeId).then(() => {
        getRecipes().then((recipeData) => setRecipes(recipeData));
      });
    }
  };

  const deleteFavoriteRecipe = (e, recipeId) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to remove this favorite recipe?");
        if (confirmed) {
    deleteRecipeAsFave(recipeId).then(() =>
      getRecipes().then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
        );
        setRecipes(sortedData);
      })
    );
  };
}

  const favoriteThisRecipe = (e, recipeId) => {
    e.preventDefault();
    markRecipeAsFave(recipeId).then(() =>
      getRecipes().then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
        );
        setRecipes(sortedData);
      })
    );
  };

  return (
    <>
      <Intro/>
      <article className="add__home_recipes">
        <button
          className="button_save"
          onClick={() => {
            navigate({ pathname: "/recipes/publish" });
          }}
        >
          Add 🧉
        </button>
      </article>
      <article className="recipes">
        {recipes.map((recipe) => {
          return (
            <section key={`recipe--${recipe.id}`} className="recipe">
              <section className="recipe__header">
                <h2
                  className="recipe__name"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  {recipe.name}
                </h2>
                <div className="recipe_favorite">
                {recipe.is_favorite ? (
                  <i
                    className="unfave_icon"
                    onClick={(e) => {
                      deleteFavoriteRecipe(e, recipe.id);
                    }}
                  >
                    <FaStar />
                  </i>
                ) : (
                  <i
                    className="fave_icon"
                    onClick={(e) => {
                      favoriteThisRecipe(e, recipe.id);
                    }}
                  >
                    <FaRegStar />
                  </i>
                )}
              </div>
              </section>
              <img
                className="recipe__image"
                src={recipe.image_url}
                onClick={() => navigate(`/recipes/${recipe.id}`)}
              ></img>
              <section className="recipe__footer">
                <div
                  className="recipe__author"
                  onClick={() => navigate(`/users/${recipe.user.user.id}`)}
                >
                  <b>{recipe.mixologist.user.username}</b>
                </div>
                <div className="recipe__publication_date">
                  {recipe.publication_date}
                </div>
              </section>

              {recipe.can_edit ? (
                <>
                  <section className="action__buttons_container">
                    <i
                      className="edit__icon"
                      onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
                    ><FaRegEdit /></i>
                    <i
                      className="trash__icon"
                      onClick={() => {
                        handleDeleteRecipe(recipe.id);
                      }}
                    ><FaTrashAlt/></i>
                  </section>
                </>
              ) : (
                ""
              )}
            </section>
          );
        })}
      </article>
    </>
  );
};

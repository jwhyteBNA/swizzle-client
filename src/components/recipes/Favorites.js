import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyFavorites,
  deleteRecipeAsFave,
} from "../../managers/RecipeManager";
import { FaStar, FaRegStar, FaTrashAlt, FaRegEdit } from "react-icons/fa";

export const MyFavorites = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyFavorites().then((myRecipeData) => {
      const sortedData = myRecipeData.sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );
      setRecipes(sortedData);
    });
  }, []);

  const deleteFavoriteRecipe = (e, recipeId) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to delete this favorite?");
    if (confirmed) {
      deleteRecipeAsFave(recipeId).then(() =>
        getMyFavorites().then((data) => {
          const sortedData = data.sort(
            (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
          );
          setRecipes(sortedData);
        })
      );
    }
  };
  

  return (
    <>
    <h1 className="intro">My Favorite Recipes</h1>
      <article className="recipes_favorites">
        {recipes.map((recipe) => {
          return (
            <section key={`recipe--${recipe.id}`} className="recipe">
              <section className="recipe__header">
                <h3
                  className="recipe__title"
                  onClick={() => navigate(`/recipes/${recipe.id}`)}
                >
                  {recipe.name}
                </h3>
                <div className="recipe_favorite">
                  <i
                    className="unfave_icon"
                    onClick={(e) => {
                      deleteFavoriteRecipe(e, recipe.id);
                    }}
                  >
                    <FaStar />
                  </i>
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
                  onClick={() =>
                    navigate(`/users/${recipe.mixologist.user.id}`)
                  }
                >
                  <b>{recipe.mixologist.user.username}</b>
                </div>
                <div className="recipe__publication_date">
                  {recipe.publication_date}
                </div>
              </section>
            </section>
          );
        })}
      </article>
    </>
  );
};

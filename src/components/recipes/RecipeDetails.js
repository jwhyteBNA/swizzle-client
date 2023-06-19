import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Recipes.css";
import { deleteRecipe, deleteRecipeAsFave, getExactRecipe, markRecipeAsFave } from "../../managers/RecipeManager";

export const RecipeDetails = () => {
  const [recipe, setExactRecipe] = useState({});
  const { recipeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getExactRecipe(recipeId).then((recipeData) => {
      setExactRecipe(recipeData);
    });
  }, [recipeId]);

  const handleDeleteRecipe = (recipeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this recipe?");
        if (confirmed) {
      deleteRecipe(recipeId).then(() => {
        navigate("/recipes");
      });
    }
  };

  const deleteFavoriteRecipe = (e, recipeId) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to remove this favorite recipe?");
        if (confirmed) {
    deleteRecipeAsFave(recipeId).then(() => 
    getExactRecipe(recipeId).then((recipeData) => {
      setExactRecipe(recipeData);
    })
    )
      };
  };

  const favoriteThisRecipe = (e, recipeId) => {
    e.preventDefault();
    markRecipeAsFave(recipeId).then(() => 
    getExactRecipe(recipeId).then((recipeData) => {
      setExactRecipe(recipeData);
    })
    )
  }

  return (
    <>
      <article className="recipes">
        <section className="recipe_detail">
          <h2 className="recipe__detail">{recipe.name}</h2>
          {recipe.tag?.map((tag) => {
            return <div key={tag.id}>{tag.label}</div>;
          })}
          <div className="recipe__category_detail">
            Category: {recipe.category?.name}{" "}
          </div>
          <img className="recipe__image_detail" src={recipe.image_url}></img>
          <section className="comments__reactions">
            <div>
              <div
                className="recipe__mixologist_detail"
                onClick={() => navigate(`/mixologists/${recipe.mixologist.user.id}`)}
              >
                By: <b>{recipe.mixologist?.user?.username}</b>
              </div>
              <div className="recipe__publication_date_detail">
                Published: <i>{recipe.publication_date}</i>{" "}
              </div>
            </div>
            <button
              className="button_save"
              onClick={() => navigate(`/recipes/${recipe.id}/comments`)}
            >
              View Comments
            </button>
            <div>Servings: {recipe.servings} </div>
          </section>
          <h3 className="recipe__detail">Ingredients</h3>
          <div className="recipe__content_detail">
            {recipe.ingredients && (
              <ul>
                {recipe.ingredients.split(", ").map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            )}
          </div>
          <h3 className="recipe__detail">Directions</h3>
          <div className="recipe__content_detail">
          {recipe.directions && (
              <ol>
                {recipe.directions.split(". ").map((direction, index) => (
                  <li key={index}>{direction}</li>
                ))}
              </ol>
            )}</div>
          {recipe.notes !== null ? (
            <>
              <h3 className="recipe__detail">Notes</h3>
              <div className="recipe__content_detail">{recipe.notes} </div>
            </>
          ) : (
            ""
          )}
          <a className="recipe__content_detail" href={recipe.original_link} target="blank">
            Recipe Source
          </a>
          <div className="recipe_favorite">
                {recipe.is_favorite ? (
                  <button
                    className="btn-3"
                    onClick={(e) => {
                      deleteFavoriteRecipe(e, recipe.id);
                    }}
                  >
                    Unfavorite
                  </button>
                ) : (
                  <button
                    className="btn-2"
                    onClick={(e) => {
                      favoriteThisRecipe(e, recipe.id);
                    }}
                  >
                    Favorite
                  </button>
                )}
          </div>
          {recipe.can_edit ? (
            <section className="detail__action_buttons">
              <img
                className="action__button"
                src="../gear.png"
                onClick={() => navigate(`/recipes/${recipe.id}/edit`)}
              ></img>
              <img
                className="action__button"
                src="../trashcan.png"
                onClick={() => {
                  handleDeleteRecipe(recipe.id);
                }}
              ></img>
            </section>
          ) : (
            ""
          )}
        </section>
      </article>
    </>
  );
}

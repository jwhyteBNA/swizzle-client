import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Recipes.css";
import { deleteRecipe, getExactRecipe } from "../../managers/RecipeManager";

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
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipeId).then(() => {
        navigate("/recipes");
      });
    }
  };

  return (
    <>
      <article className="recipes">
        <section className="recipe_detail">
        <h3 className="recipe__name_detail">{recipe.name}</h3>
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
                onClick={() => navigate(`/users/${recipe.mixologist.user.id}`)}
              >
                By: <b>{recipe.mixologist?.user?.username}</b>
              </div>
              <div className="recipe__publication_date_detail">
                Published: <i>{recipe.publication_date}</i>{" "}
              </div>
            </div>
            <button
              className="comment__button"
              onClick={() => navigate(`/recipes/${recipe.id}/comments`)}
            >
              View Comments
            </button>
            <div>Servings: {recipe.servings} </div>
          </section>
          <h3>Ingredients</h3>
          <div className="recipe__content_detail">{recipe.ingredients}</div>
          <h3>Directions</h3>
          <div className="recipe__content_detail">{recipe.directions}</div>
          {recipe.notes !== null ? (
            <>
              <h3>Notes</h3>
              <div className="recipe__content_detail">{recipe.notes} </div>
            </>
          ) : (
            ""
          )}
          <a className="recipe__content_detail" href={recipe.original_link}>
            Recipe Source
          </a>
          {recipe.can_edit ?
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
          </section> : ""
            }

        </section>
      </article>
    </>
  );
};

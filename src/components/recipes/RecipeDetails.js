import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Recipes.css";
import {
  deleteRecipe,
  deleteRecipeAsFave,
  getExactRecipe,
  markRecipeAsFave,
  rateRecipe,
  updateRecipeRating,
} from "../../managers/RecipeManager";
import { FaStar, FaRegStar, FaTrashAlt, FaRegEdit } from "react-icons/fa";

export const RecipeDetails = () => {
  const [recipe, setExactRecipe] = useState({});
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(recipe.user_rating);
  const [avgRating, setAvgRating] = useState(recipe.avg_rating);

  useEffect(() => {
    getExactRecipe(recipeId).then((recipeData) => {
      setExactRecipe(recipeData);
      setRating(recipeData.user_rating);
      setAvgRating(recipeData.avg_rating);
    });
  }, [recipeId]);

  const handleDeleteRecipe = (recipeId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (confirmed) {
      deleteRecipe(recipeId).then(() => {
        navigate("/recipes");
      });
    }
  };

  const deleteFavoriteRecipe = (e, recipeId) => {
    e.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to remove this favorite recipe?"
    );
    if (confirmed) {
      deleteRecipeAsFave(recipeId).then(() =>
        getExactRecipe(recipeId).then((recipeData) => {
          setExactRecipe(recipeData);
        })
      );
    }
  };

  const favoriteThisRecipe = (e, recipeId) => {
    e.preventDefault();
    markRecipeAsFave(recipeId).then(() =>
      getExactRecipe(recipeId).then((recipeData) => {
        setExactRecipe(recipeData);
      })
    );
  };

  const ratingChanged = (newRating) => {
    const ratingToSendToAPI = {
      recipe: parseInt(recipeId),
      rating: parseFloat(newRating)
    };
    if (recipe.user_rating !== null) {  
      updateRecipeRating(recipeId, ratingToSendToAPI).then(() => {
        setRating(newRating);
        getExactRecipe(recipeId).then((recipeData) => {
          setExactRecipe(recipeData);
        });
      });
    } else {    
      rateRecipe(recipeId, ratingToSendToAPI).then(() => {
        setRating(newRating);
        getExactRecipe(recipeId).then((recipeData) => {
          setExactRecipe(recipeData);
        });
      });
    }
  };
  
  

  return (
    <>
      <article className="recipes">
        <section className="recipe_detail">
          <h2 className="recipe__detail">{recipe.name}</h2>
          <section className="all_ratings">
          {recipe.name && (
          <div className="user_rating">
            <div>Your Current Rating:</div>
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              activeColor="#f6a98d"
            />
          </div>
        )}
            {recipe.name && (
          <div className="average_rating">
            <div>Average Rating:</div>
            <ReactStars
              count={5}
              value={avgRating}
              edit={false}
              size={24}
              isHalf={true}
              activeColor="#f6a98d"
            />
          </div>
        )}
        </section>
            <section className="tag_cat_details">
            <div className="recipe__tag_detail">
            {recipe.tag?.sort((a, b) => a.label.localeCompare(b.label)).map((tag) => tag.label).join(", ")}
          </div>
          <div className="recipe__category_detail">
            Category: {recipe.category?.name}
          </div>
          </section>
          <img className="recipe__image_detail" src={recipe.image_url}></img>
          <section className="comments__reactions">
            <div>
              <div
                className="recipe__mixologist_detail"
                onClick={() =>
                  navigate(`/mixologists/${recipe.mixologist.user.id}`)
                }
              >
                By: <b>{recipe.mixologist?.user?.username}</b>
              </div>
              <div className="">
                Published: <i>{recipe.publication_date}</i>{" "}
              </div>
            </div>
            <button
              className="button_save"
              onClick={() => navigate(`/recipes/${recipe.id}/comments`)}
            >
              View Comments
            </button>
            <div>
            <div>Servings: {recipe.servings} </div>
            <div className="recipe_favorite">
        <div>Favorite?</div>
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
          </div>
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
            )}
          </div>
          {recipe.notes !== null ? (
            <>
              <h3 className="recipe__detail">Notes</h3>
              <div className="recipe__content_detail">{recipe.notes} </div>
            </>
          ) : (
            ""
          )}
          <a
            className="recipe__content_link"
            href={recipe.original_link}
            target="blank"
          >
            Recipe Source
          </a>
          {recipe.can_edit ? (
            <section className="detail__action_buttons">
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
          ) : (
            ""
          )}
        </section>
      </article>
    </>
  );
};

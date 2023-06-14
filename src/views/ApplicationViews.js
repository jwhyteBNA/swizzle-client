import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagList } from "../components/tags/TagList"
import { CategoryList } from "../components/categories/CategoryList"
import { AllRecipes } from "../components/recipes/AllRecipes"
import { RecipeDetails } from "../components/recipes/RecipeDetails"
import { RecipeForm } from "../components/recipes/RecipeForm"
import { UpdateRecipeForm } from "../components/recipes/UpdateRecipeForm"
import { MyRecipes } from "../components/recipes/MyRecipes"
import { RecipeList } from "../components/recipes/RecipeList"
import { CommentList } from "../components/comments/CommentList"
import { MixologistList } from "../components/users/UserList"
import { UserDetail } from "../components/users/UserDetails"


export const ApplicationViews = ({ token, setToken }) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route element={<Authorized token={token} />}>
                <Route path="/" element={<RecipeList />} />
                <Route path="/recipes" element={<AllRecipes />} />
                <Route path="/recipes/publish" element={<RecipeForm />} /> 
                <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
                <Route path="/recipes/:recipeId/edit" element={ <UpdateRecipeForm /> } />
                <Route path="/recipes/myrecipes" element={<MyRecipes />} />
                <Route path="/recipes/:recipeId/comments" element={ <CommentList /> } />
                <Route path="/tagmanager" element={<TagList/>}/>
                <Route path="/categorymanager" element={<CategoryList/>}/>
                <Route path="/Mixologists" element={<MixologistList />} />
                <Route path="/Mixologists/:MixologistId" element={<UserDetail />} />
            </Route>
        </Routes>
    </>
}

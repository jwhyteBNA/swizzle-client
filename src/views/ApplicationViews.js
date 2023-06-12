import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TagList } from "../components/tags/TagList"
import { CategoryList } from "../components/categories/CategoryList"
import { AllRecipes } from "../components/recipes/AllRecipes"


export const ApplicationViews = ({ token, setToken }) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route element={<Authorized token={token} />}>
                <Route path="/recipes" element={<AllRecipes />} />
                <Route path="/tagmanager" element={<TagList/>}/>
                <Route path="/categorymanager" element={<CategoryList/>}/>
                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}

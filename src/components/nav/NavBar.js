import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import React from "react";
import Logo from "../../images/ClearLogo.svg";

export const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar-menu">
        <Link to="/" className="navbar__img-link">
            <img className="navbar__img" src={Logo} alt="Logo" />
          </Link>
      
        {token ? (
          <>
            <Link to="/recipes" className="navbar__item"> All Recipes
            </Link>
            <Link to="/recipes/myrecipes" className="navbar__item"> My Recipes
            </Link>
            <Link to="/categorymanager" className="navbar__item"> Category Manager
            </Link>
            <Link to="/tagmanager" className="navbar__item">Tag Manager
            </Link>
            <Link to="/mixologists" className="navbar__item">Mixologists
            </Link>
            <Link to="/login"
                className="navbar__item"
                onClick={() => {
                  setToken("");
                  navigate("/login");
                }}
              >
                Logout
              </Link>
          </>
        ) : (
          ""
        )}
    </nav>
  );
};

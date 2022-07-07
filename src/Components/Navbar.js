import React from "react";
import FavoriteContext from "../context/favoritesContext";

const { useContext } = React;

const Navbar = () => {
  const { favoritePokemons } = useContext(FavoriteContext);

  
  return (
    <nav>
      <div />
      <div>
      </div>
    </nav>
  );
};

export default Navbar;

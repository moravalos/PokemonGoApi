import React, { Suspense } from "react";
import "./Styles.css";
import Searchbar from "./Components/Searchbar";
import Pokedex from "./Components/Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "./api";
import { FavoriteProvider } from "./context/favoritesContext";
import Footer from "./Components/Footer";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navegacion/Navbar";
import inicio from "./Components/paginas/inicio";
import pokemon from "./Components/paginas/pokemon";
import items from "./Components/paginas/item";

const { useState, useEffect } = React;

const localStorageKey = "favorite_pokemon";

function Welcome() {
  const { t, i18n } = useTranslation(['welcome']);
  function changeToEnglish() {
    i18n.changeLanguage("en");
  }

  function changeToSpanish() {
    i18n.changeLanguage("es");
  }
  
  const welcomes = t("title");
  
  return (
    <div className="App">
        <p>Idioma actual: {i18n.language}</p>
        <button onClick={changeToEnglish}>Inglés</button>
        <button onClick={changeToSpanish}>Español</button>
        <br></br>
        <p>{welcomes}</p>
    </div>
  );
}



export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const data = await getPokemons(6, 6 * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(data.count / 25));
      setNotFound(false);
    } catch (err) {}
  };

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    if (!searching) {
      fetchPokemons();
    }
  }, [page]);

  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = updated.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  };

  const onSearch = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if (!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  };

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons
      }}
    >
      <div>
        <Router>
          <Navbar/>
        </Router>
        <div className="App">
          <Searchbar onSearch={onSearch} />
          {notFound ? (
            <div className="not-found-text">
              Resultados de la busqueda: No se encontro lo que buscabas
            </div>
          ) : (
            <Pokedex
              loading={loading}
              pokemons={pokemons}
              page={page}
              setPage={setPage}
              total={total}
            />
          )}
        </div>
        <Suspense fallback="Cargando traducciones...">
      <Welcome />
    </Suspense>      
    </div>
    </FavoriteProvider>
  );
}

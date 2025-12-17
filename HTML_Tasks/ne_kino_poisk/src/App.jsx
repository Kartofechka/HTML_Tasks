import { useState, useEffect } from "react";
import { HashRouter, NavLink, Routes, Route } from "react-router-dom";

import "./App.css";


import Autorisation from "./components/autorisation";
import FilmList from "./components/film_list";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {!isAuthorized ? (
        <Autorisation onSuccess={(username) => {
          setCurrentUser(username);
          setIsAuthorized(true);
        }} />
      ) : (
        <FilmList></FilmList>
      )}
    </>
  );
}

export default App;

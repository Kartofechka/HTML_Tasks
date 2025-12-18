import { useState } from "react";

import "./App.css";

import Autorisation from "./components/Autorisation";
import FilmList from "./components/FilmList";

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setRole] = useState(null)

  const handleLogout = () => {
    setCurrentUser(null);
    setRole(null)
    setIsAuthorized(false);
  };

  return (
    <>
      {!isAuthorized ? (
        <Autorisation onSuccess={(username, role) => {
          setCurrentUser(username);
          setIsAuthorized(true);
          setRole(role)
        }} />
      ) : (
        <FilmList role={userRole} onLogout={handleLogout}/>
      )}
    </>
  );
}

export default App;

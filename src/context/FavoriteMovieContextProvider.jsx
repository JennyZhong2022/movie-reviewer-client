import { createContext, useState } from "react";

export const FavoriteMovieContext = createContext([]);

const FavoriteMovieContextProvider = ({ children }) => {
  const [favoriteList, setFavoriteList] = useState([]);

  return (
    <FavoriteMovieContext.Provider value={{ favoriteList, setFavoriteList }}>
      {children}
    </FavoriteMovieContext.Provider>
  );
};

export default FavoriteMovieContextProvider;

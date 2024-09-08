import React, { createContext, useState } from "react";

export const SearchQueryContext = createContext("");

const SearchQueryContextProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Initialize with an empty string

  return (
    <SearchQueryContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchQueryContext.Provider>
  );
};

export default SearchQueryContextProvider;

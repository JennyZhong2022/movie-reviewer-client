// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Movies from "./containers/MoviesSearchResultLoader/MoviesSearchResultLoader";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import MovieDetailsLoader from "./containers/MovieDetailsLoader/MovieDetailsLoader";
import MyMoviesCollection from "./pages/MyMoviesCollection/MyMoviesCollection";
import Footer from "./components/Footer/Footer";
import SearchQueryContextProvider from "./context/SearchQueryContextProvider";
import FavoriteMovieContextProvider from "./context/FavoriteMovieContextProvider";
import { AuthContextProvider } from "./context/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <SearchQueryContextProvider>
          <FavoriteMovieContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/movies-search" element={<Movies />} />
              <Route 
                path="/movie/:id" 
                element={
                 
                    <MovieDetailsLoader />
                  
                } 
              />
              <Route 
                path="/my-movies" 
                element={
                  <ProtectedRoute>
                    <MyMoviesCollection />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            {/* <Footer /> */}
          </FavoriteMovieContextProvider>
        </SearchQueryContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.scss";
import { AuthContext } from "../../context/AuthContextProvider";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  // menuRef.current is a mutable ref, it can be used to access DOM element or a component instance
  const menuRef = useRef(null);

  const { isAuthenticated, signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShowMenuBtn = () => {
    setShowMenu(!showMenu);
    console.log("menu clicked");
  };

  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // check if mouse clicks elements not be useReffed (anywhere on the page except the referenced element), if so, set showMenu false
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    // and trigger the handleClickOutside function by mousedown -- mousedown is press down. Can use click too, click is press down and release
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // clean side effect by using return function when the component unmounts.
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(showMenu);

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={styles.logoLink}>
        <span className={styles.logoSpan}>MovieLover</span>
      </NavLink>
      {/* <span>Welcome,user</span> */}

      <SearchBar />

      {/* <NavLink to="/movies-search" className={styles.link}>
        {" "}
        <span className={styles.span}>Movies</span>{" "}
      </NavLink> */}

      {/* add ref={menuRef} here for the menuWrapper to access it's DOM */}
      <div className={styles.menuWrapper} ref={menuRef}>
        <div className={styles.links}>
          {isAuthenticated ? (
            <>
              <NavLink to="/my-movies" className={styles.link}>
                <span className={styles.collectionSpan}>Collection</span>
              </NavLink>
              <button className={styles.signUpButton} onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/sign-in" className={styles.link}>
                <button className={styles.signUpButton}>Sign In</button>
              </NavLink>
            </>
          )}
        </div>

        <button
          className={`${styles.dropdownBtn} ${styles.signUpButton}`}
          onClick={handleShowMenuBtn}
        >
          Menu
        </button>
        {showMenu && (
          <div className={styles.dropdownMenu}>
            {isAuthenticated ? (
              <>
                <NavLink to="/my-movies" className={styles.link}>
                  <span className={styles.span}>Collection</span>
                </NavLink>
                <button className={styles.signUpButton} onClick={handleSignOut}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/sign-up" className={styles.link}>
                  <button className={styles.signUpButton}>Sign up</button>
                </NavLink>
                <NavLink to="/sign-in" className={styles.link}>
                  <button className={styles.signUpButton}>Sign In</button>
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

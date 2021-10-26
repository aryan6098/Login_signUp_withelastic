import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link, Redirect } from "react-router-dom";
import "./Navbar.css";
function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLogout, setIsLogout] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logout = () => {
    localStorage.removeItem("user-info");
    setIsLogout(true);
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <div>
      {isLogout ? (
        <Redirect to="/" />
      ) : (
        <>
          <nav className="navbar">
            <div className="navbar-container">
              <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                TRVL
                <i class="fab fa-typo3" />
              </Link>
              <div className="menu-icon" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
              </div>
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                  <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/services"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/products"
                    className="nav-links"
                    onClick={closeMobileMenu}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="nav-links-mobile"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
              {button && (
                <Button buttonStyle="btn--outline" onclick={logout}>
                  Log out
                </Button>
              )}
            </div>
          </nav>
        </>
      )}
    </div>
  );
}

export default Navbar;

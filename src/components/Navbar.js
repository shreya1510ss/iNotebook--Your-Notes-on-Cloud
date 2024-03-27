import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white' }} >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link `} to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              {!localStorage.getItem("token") ? (
                <>
                  <Link
                    className="btn btn-primary mx-2"
                    to="/login"
                    role="button"
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#28a745")
                    } // Change to green color on mouse over
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#007BFF")
                    }
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-primary mx-2"
                    to="/signup"
                    role="button"
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#28a745")
                    } // Change to green color on mouse over
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#007BFF")
                    }
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  
                  className="btn btn-primary mx-5"
                  onClick={handleLogout}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#28a745")
                  } // Change to green color on mouse over
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#007BFF")
                  }
                >
                  Logout
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

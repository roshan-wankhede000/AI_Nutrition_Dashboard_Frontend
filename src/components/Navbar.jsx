import { useNavigate }
from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    navigate("/login");
  };

  return (

    <nav className="navbar navbar-dark bg-dark">

      <div className="container">

        <span className="navbar-brand">
          AI Nutrition Dashboard
        </span>

        <button
          onClick={logout}
          className="btn btn-danger"
        >
          Logout
        </button>

      </div>

    </nav>

  );
};

export default Navbar;
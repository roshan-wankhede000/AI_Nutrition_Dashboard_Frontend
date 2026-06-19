import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        form
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/");

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow p-4">

            <h2 className="mb-4 text-center">
              Login
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email"
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value
                  })
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                autoComplete="password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
              />

              <button
                className="btn btn-primary w-100"
              >
                Login
              </button>

            </form>

            <p className="mt-3 text-center">
              Don't have an account?
              <Link to="/register">
                {" "}Register
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
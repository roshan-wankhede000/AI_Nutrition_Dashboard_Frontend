import {
  useState
} from "react";

import API from "../api/axios";

const Register = () => {

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await API.post(
            "/auth/register",
            form
          );

        alert(
          res.data.message
        );

      } catch (error) {

        alert(
          error.response.data.message
        );

      }
    };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card p-4">

            <h2>
              Register
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
            >

              <input
                className="form-control mb-3"
                placeholder="Name"
                onChange={(e)=>
                  setForm({
                    ...form,
                    name:e.target.value
                  })
                }
              />

              <input
                className="form-control mb-3"
                placeholder="Email"
                onChange={(e)=>
                  setForm({
                    ...form,
                    email:e.target.value
                  })
                }
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                autoComplete="password"
                onChange={(e)=>
                  setForm({
                    ...form,
                    password:e.target.value
                  })
                }
              />

              <button
                className="btn btn-primary w-100"
              >
                Register
              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
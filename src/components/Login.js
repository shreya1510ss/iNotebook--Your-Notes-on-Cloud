import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Logged in succesfully", "success");
    } else {
      props.showAlert("Invalid details", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f0f070",
        height: "100%",
        display: "flex",
        padding: "70px 0px",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px", 
      }}
    >
      <form className="my-3 mt-2" onSubmit={handleSubmit}>
        <h2>Login to continue to iNotebook</h2>
        <div className="form-group my-3">
          <label className="my-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter Email"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group my-3">
          <label className="my-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder=" Enter Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary my-4"
          onMouseOver={(e) => (e.target.style.backgroundColor = "#28a745")} // Change to green color on mouse over
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

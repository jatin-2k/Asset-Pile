import React, { useState } from "react";
import Base from "../core/Base";

import { Link, Navigate } from "react-router-dom";

import { signin, authenticate, isAuthenticated } from "../helper/index";
import Alert from "../core/Alert";

const Signin = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { name, password, error, loading, didRedirect } = values;
  // console.log(isAuthenticated());
  // const { user } = isAuthenticated();

  const handleChange = (field) => (e) => {
    let val = e.target.value;
    console.log(val);
    setValues({ ...values, error: false, [field]: val });
  };
  const onSubmit = (event) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // console.log("YOUR NAME " + typeof name);
    if (!name) {
      return setValues({
        ...values,
        error: "Please enter a First Name number",
      });
    } else if (!password.match(/^[a-z0-9]+$/i)) {
      setValues({
        ...values,
        error: "Password can only contain letter and numbers",
      });
      return;
    } else {
      event.preventDefault();
      setValues({ ...values, error: false, loading: true });
      signin({ name, password })
        .then((data) => {
          console.log(data);
          if (data.error) {
            // console.log(data);
            setValues({
              ...values,
              error: data.error,
              loading: false,
              success: false,
            });
          } else {
            authenticate(data, () => {
              setValues({ ...values, didRedirect: true });
            });
          }
        })
        .catch((err) => console.log("Error: ", err + "signin failed"));
    }
  };
  const loader = () => {
    return (
      loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )
    );
  };

  const performRedirect = () => {
    // console.log("AUTHENTICATE" + isAuthenticated());
    if (didRedirect) {
      return <Navigate to="/" />;
    }
    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };
  const signinForm = () => {
    return (
      <section className=" p-5" style={{ backgroundColor: "#eee" }}>
        <div
          className="container-fluid p-5 h-custom"
          style={{ backgroundColor: "white", borderRadius: "25px" }}
        >
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal p-3 mb-0 me-3">Sign in with</p>
                </div>

                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    onChange={handleChange("name")}
                    value={name}
                    type="text"
                    id="username"
                    className="form-control form-control-lg"
                    placeholder="Enter your username"
                  />
                  <label className="htmlForm-label" htmlFor="form3Example3">
                    Name
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-3">
                  <input
                    onChange={handleChange("password")}
                    value={password}
                    type="password"
                    id="password"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                  />
                  <label className="htmlForm-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* <!-- Checkbox --> */}
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    />
                    <label
                      className="htmlForm-check-label"
                      htmlFor="form2Example3"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-body">
                    Forgot password?
                  </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    onClick={onSubmit}
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to={"/signup"} className="link-danger">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Base>
      {loader()}
      {error && <Alert msg={error} type={"danger"} />}
      {signinForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;

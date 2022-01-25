import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signup } from "../helper";
import Alert from "../core/Alert";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    loading: false,
    error: "",
    success: false,
  });
  const { name, password, loading, error, success } = values;
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
      signup({ name, password })
        .then((data) => {
          // console.log(data);
          if (data.error) {
            // console.log(data);
            setValues({
              ...values,
              error: data.error,
              loading: false,
              success: false,
            });
          } else {
            setValues({
              ...values,
              name: "",
              password: "",
              success: true,
            });
          }
        })
        .catch((err) => console.log("Error: ", err));
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

  const successMessage = () => {
    return (
      <div
        className={`alert alert-success alert-dismissible fade show d-flex align-items-center`}
        role="alert"
      >
        <div>
          New account was created successfully. Please{" "}
          <Link to="/signin">Login Here</Link>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <section className="p-5 " style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              required
                              tabIndex="0"
                              onChange={handleChange("name")}
                              value={name}
                              type="text"
                              id="name"
                              placeholder="Enter your first name"
                              className="form-control"
                            />
                            <label className="htmlForm-label" htmlFor="name">
                              Your name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              required
                              tabIndex="0"
                              onChange={handleChange("password")}
                              value={password}
                              type="password"
                              className="light-bg form-control"
                              name="password"
                              id="password"
                              placeholder="Enter your last password"
                            />
                            <label
                              className="htmlForm-label"
                              htmlFor="form3Example4c"
                            >
                              Password {password}
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label
                            className="htmlForm-check-label"
                            htmlFor="form2Example3"
                          >
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            tabIndex="0"
                            onClick={onSubmit}
                            className="btn btn-primary btn-lg"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <image
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <Base>
      {loader()}
      {error && <Alert msg={error} type={"danger"}></Alert>}
      {success && successMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;

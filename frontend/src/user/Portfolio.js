import React, { useState } from "react";
import Base from "../core/Base";
import AssetTable from "../components/AssetTable";
import data from "../components/dummy-data";
import { addAssetsToUserList, isAuthenticated } from "../helper";
import Alert from "../core/Alert";
import { Navigate } from "react-router-dom";
// import LineChart from "../components/LineChart";

const Portfolio = () => {
  const [values, setValues] = useState({
    asset: "",
    loading: false,
    error: "",
    success: false,
  });

  const { asset, error, success, loading } = values;
  const handleChange = (field) => (e) => {
    let val = e.target.value;
    console.log(val);
    setValues({ ...values, error: false, [field]: val });
  };
  const { user, token } = isAuthenticated();
  console.log("USER :", user, "TOKEN : ", token);

  if (!isAuthenticated()) {
    return <Navigate to="/signin"></Navigate>;
  }
  const onSubmit = (event) => {
    // window.scrollTo({})

    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    // console.log(typeof asset);

    addAssetsToUserList(user._id, token, { asset })
      .then((data) => {
        console.log("DATA", data);
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            loading: false,
            success: false,
          });
        } else {
          setValues({
            ...values,
            asset: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log("ERROR IN ADDING ASSETS", err));
  };

  const Add = () => {
    return (
      <div className=" container container-fluid">
        <form>
          <div className="d-flex justify-content-around">
            <div className="col-lg-4 col-8">
              <div className="input-group mb-2">
                <div className="input-group-prepend">
                  <div className="input-group-text">Name</div>
                </div>
                <input
                  onChange={handleChange("asset")}
                  value={asset}
                  type="text"
                  className="form-control"
                  id="asset"
                  name="asset"
                  placeholder="Add name of asset"
                />
              </div>
            </div>

            <div className="col-lg-4 col-3">
              <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-primary mb-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };
  return (
    <Base>
      {error && <Alert msg={error} type={"danger"} />}
      {Add()}

      <AssetTable data={data} />
      {/* <LineChart /> */}
    </Base>
  );
};

export default Portfolio;

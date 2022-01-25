import "./App.css";
import LineChart from "./components/LineChart";
const { getUsersAssetList } = require("./helper/index");
import AssetTable from "./components/asset-table";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import data from "./components/dummy-data";

const App = () => {
  getUsersAssetList();
  return (
    <div className="container col-8">
      <LineChart />
      <AssetTable data={data} />
    </div>
  );
};

export default App;

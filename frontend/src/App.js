import "./App.css";
import AssetTable from "./components/asset-table";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import data from "./components/dummy-data";

const App = () => {
  return (
    <div className="container col-8">
        <AssetTable data ={data}/>
    </div>
  );
};

export default App;

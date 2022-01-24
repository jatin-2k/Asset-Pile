import "./App.css";
import LineChart from "./components/LineChart";
const { getUsersAssetList } = require("./helper/index");
const App = () => {
  getUsersAssetList();
  return (
    <div>
      <LineChart />
    </div>
  );
};

export default App;

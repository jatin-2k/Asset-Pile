import { React, Component, isValidElement } from "react";
import Alert from "../core/Alert";

class AssetTable extends Component {

    constructor(props){
        super(props)
        this.state = {
            data : [],
            error: ""
        }
    }

    componentDidMount(){
        this.props.data.map((symbol) => {
            //console.log("https://financialmodelingprep.com/api/v3/historical-price-full/"+symbol+"?apikey="+"eb02acdedc4fc4b8ee220127baf9c7f0");
            fetch("https://financialmodelingprep.com/api/v3/historical-price-full/"+symbol+"?apikey="+"")
            .then((response) => {
                console.log("THIS SHIT");
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((res) => {
                if(Object.keys(res).length===0) throw new Error("Your Equity name is invalid: " + symbol);
                else{
                    this.setState({ data: [...this.state.data,res]});
                    console.log("DATA STORED");
                }
            })
            .catch((err) => {
                this.setState({error: err.message});
                console.log('error: ' + err);
            });
        });
    }

    render() {

        //#region Helper Functions
        const name = (asset) => {
            return (
            <td>
                <p className="mb-1 text-dark font-weight-medium">{asset.symbol}</p>
                {/* <small className="font-weight-medium">{asset.fullname}</small> */}
            </td>
            );
        };
        const price = (assetPrice) => {
            return <td className="font-weight-medium">${assetPrice}</td>;
        };
        const change = (assetchange) => {
            const sign = (num) => {
            return num >= 0
                ? "text-success font-weight-medium"
                : "text-danger font-weight-medium";
            };
            return <td className={sign(assetchange)}>{assetchange}</td>;
        };
        const button = () => {
            return (
            <td>
                <button>Press</button>
            </td>
            );
        };
        const row = (asset, index) => {
            return (
            <tr key = {index}>
                {name(asset)}
                {price(asset.historical[0].open)}
                {change(asset.historical[0].change)}
                {button()}
            </tr>
            );
        };
        const rows = (assets) => {
            if(assets.length === 0 || this.state.error !== "") return (<></>);
            return assets.map((asset, index) => {
            return row(asset, index);
            });
        };
    //#endregion

        const table = (assets) => {
            console.log("Array");
            console.log(assets);
            return (
                <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                    <h4 className="card-title mb-0">Your Assets</h4>
                    <div className="table-responsive">
                        <table className="table table-stretched">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Last Price</th>
                            <th>Change</th>
                            <th>Charts</th>
                            </tr>
                        </thead>
                        <tbody>{rows(assets)}</tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
            );
        };

        return (
            <div>
                {(this.state.error) && <Alert msg = {this.state.error} type="danger"></Alert>}
                {table(this.state.data)}
                
            </div>
        );
    }
}


export default AssetTable;

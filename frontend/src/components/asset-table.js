import {React, Component} from "react";

class AssetTable extends Component{

    render() {
        const data = this.props.data;
        
        const table = (assets) => {
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
        
        return <div>{table(data)}</div>;
    }
}

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
const row = (asset) => {
    return (
        <tr>
        {name(asset)}
        {price(asset.historical[0].open)}
        {change(asset.historical[0].change)}
        {button()}
        </tr>
    );
};
const rows = (assets) => {
    return assets.map((asset) => {
        return row(asset);
    });
};
//#endregion

export default AssetTable;

import React, { Component } from "react";
class TableHeaders extends Component {
  render() {
    return (
      <thead>
        <tr style={{ whiteSpace: "nowrap" }}>
          {this.props.coloumns.map((coloumn) => (
            <th className="clickable" key={coloumn.path || coloumn.key}>
              {coloumn.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeaders;

import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, coloumn, index) => {
    if (coloumn.content) return coloumn.content(item, index);

    return _.get(item, coloumn.path);
  };

  createKey = (item, coloumn) => {
    return item.id + (coloumn.label || coloumn.key || coloumn.path);
  };

  render() {
    const { data, coloumns } = this.props;
    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            {coloumns.map((coloumn) => (
              <td
                key={this.createKey(item, coloumn)}
                data-label={coloumn.label ? coloumn.label : coloumn.key}
              >
                {this.renderCell(item, coloumn, index + 1)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;

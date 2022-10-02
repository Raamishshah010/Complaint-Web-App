import React from "react";
import TableBody from "./tableBody";
import TableHeaders from "./tableHeaders";

const Table = ({ data, coloumns }) => {
  return (
    <div className=" table-responsive">
      <table className="table table-striped table-bordered">
      <TableHeaders coloumns={coloumns} />
      <TableBody coloumns={coloumns} data={data} />
    </table>
    </div>
  );
};

export default Table;

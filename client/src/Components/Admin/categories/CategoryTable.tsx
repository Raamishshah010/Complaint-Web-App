import React from "react";
import Table from "../../common/table";

interface CategoryTableProps {
  data: Array<any>;
  deleteItem: (id: string) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ data, deleteItem }) => {
  const columns = [
    {
      label: "Title",
      key: "Title",
      content: (item: any) => <span className="pl-5">{item.title}</span>,
    },

    {
      key: "Delete",
      label: "",
      content: (item: any) => (
        <button className="btn btn-danger mr-5" style={{float: "right"}} onClick={() => deleteItem(item._id)}>
          Delete
        </button>
      ),
    },
  ];
  return (
    <div className="my-3">
      <Table data={data} coloumns={columns} />
    </div>
  );
};

export default CategoryTable;

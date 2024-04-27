import DataTable from "react-data-table-component";



const Table = ({ data, columns, select, selectFunc }) => {
  if (!select) {
    select = false
  }
  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    selectFunc(selectedRows);
  };
  return <DataTable columns={columns} data={data} selectableRows={select} onSelectedRowsChange={handleChange} />;
}

export default Table;
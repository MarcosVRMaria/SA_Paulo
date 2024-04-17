import DataTable from "react-data-table-component";



const Table= ({data, columns, select, selectFunc }) => {
  if (!select){
    select = false
  }
  return <DataTable  columns={columns} data={data} selectableRows={select} onSelectedRowsChange={selectFunc} />;
}

export default Table;
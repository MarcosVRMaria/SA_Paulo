import DataTable from "react-data-table-component";



const Table= ({data, columns}) => {
  return <DataTable  columns={columns} data={data} />;
}

export default Table;
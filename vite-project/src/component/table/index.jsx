import DataTable from "react-data-table-component";



const Table = ({ data, columns, select, selectFunc }) => {
  if (!select) {
    select = false
  }

  const customStyles = {
    table:{
      style:{
        border:"solid 1px black",
        borderRadius:"5px",
        borderColor:"#023f81"
      }},
    rows:{
      style:{
      borderRadius:"5px"
      }
    },
    head: {
      style: {
       borderRadius: "5px"
      },
    },
    headRow: {
      style: {
        borderRadius: "5px",
        borderBottom : '0px',
        

      },
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderWidth: '1px',
          borderColor: "black",
          borderBottom: "0px",
        },
      },
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderWidth: '1px',
          borderColor: "#000000",
          borderBottom: "0px",
        },
      },
    },
  };



  return (

    <DataTable style={{
    }} columns={columns} data={data} selectableRows={select} customStyles={customStyles} onSelectedRowsChange={selectFunc} />
  )
}

export default Table;
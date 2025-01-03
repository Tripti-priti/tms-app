import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';



const RoleList = (props) => {

 

  return (
    <>
   
     <div style={{ height: 500, width: '100%'}}>
     <DataGrid rows={props.userData} columns={props.columns} rowHeight={30}
     slots={{
      toolbar: GridToolbar,
    }}
     />
   </div>
   </>
  );
}

export default RoleList;


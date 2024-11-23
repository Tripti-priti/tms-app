import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { RemoveRedEye } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { colors } from '@mui/material';
import { DataGrid, GridToolbar, renderActionsCell } from '@mui/x-data-grid';
import { ClassNames } from '@emotion/react';



const UserTable = () => {

  const [userData,setUserData] = React.useState([]);

  React.useEffect(()=>{
    fetchUserList();
  },[])

  const fetchUserList = ()=>{
    axios.get('http://localhost:3001/api/users')
    .then((res)=>{
      console.log(res.data);
      setUserData(res.data);
    })
  }

  
const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];

const columns = [
  { field: 'srno', headerName: 'Sr No.', width: 100 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'mobile', headerName: 'Mobile', width: 150 },
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'action', headerName: 'Action', width: 200
    ,valueGetter: (value) => {
    if (!value) {
      return value;
    }
    // Convert the decimal value to a percentage
    return value * 100;
  },
  renderCell: (params) => (
    <>
      <Link to={'/userdetail/'+params.id} ><RemoveRedEye/></Link>
    </>
  ),
},
];


  return (
    <>
    {/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow style={{backgroundColor:'rgb(237 244 251)'}}>
            <TableCell style={{fontWeight:'bold'}}>Sr No.</TableCell>
            <TableCell align="left" style={{fontWeight:'bold'}}>Username</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Mobile</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Email</TableCell>
            <TableCell align="right" style={{fontWeight:'bold'}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index+1}
              </TableCell>
              <TableCell align="left"><Link to={'/userdetail/'+row._id} className='App-link'>{row.username}</Link></TableCell>
              <TableCell align="right">{row.mobile}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">
                <Link to={'/userdetail/'+row.id}><RemoveRedEye/></Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}
     <div style={{ height: 500, width: '100%'}}>
     <DataGrid rows={userData} columns={columns} rowHeight={30}
     slots={{
      toolbar: GridToolbar,
    }}
     />
   </div>
   </>
  );
}

export default UserTable;


import { Button, Card, CardContent, Grid2, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoleList from './RoleList';
import axios from 'axios';
import { Delete, Edit } from '@mui/icons-material';
import AlertMessage from '../shared/AlertMessage';

const RoleDetails = () => {
  const [role, setRole] = useState("");
  const [description,setDescription]=useState("");
  const [userData,setUserData] = useState([]);
  const [action,setAction]=useState("Create");
  const [open,setOpen]=useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [disabled, setDisabled] = useState(false);
  // const [userId,setUserId]=useState();
  const [roleId,setRoleId]=useState();

const saveRole=()=>{

  if (action === 'Create') {
 
    axios.post('http://localhost:3001/api/role', {

      "comp_id": "67322719306557f042aba5a7",
      "name" :role,
      "description":description   
  

    }).then((res) => {
      setSeverity('success')
      setMessage("Record Saved Successfully.")
      setOpen(true);
    //  setDisabled(true);    
      //setAction('Edit');
      fetchUserList();
      //console.log(res.data._id);
      //setRoleId(res.data._id);
    })   .catch((err) => {
      setSeverity('error')
      setMessage(err.message)
      setOpen(true);
  })

  }
else {

  axios.put('http://localhost:3001/api/role/' + roleId, {
    "comp_id": "67322719306557f042aba5a7",
    "name" :role,
    "description":description,
    "mod_dt":Date.now()
  })
      .then(() => {
          setSeverity('success')
          setMessage("Record Updated Successfully.")
          setOpen(true);
          setRole("");
          setDescription("");
          setRoleId("");
          setAction("Create");
          fetchUserList();
      })
      .catch((err) => {
          setSeverity('error')
          setMessage(err.message)
          setOpen(true);
      })
}




}
const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
      return;
  }
  setOpen(false);
};

  React.useEffect(()=>{
    fetchUserList();
  },[])

  const fetchUserList = ()=>{
    axios.get('http://localhost:3001/api/role')
    .then((res)=>{
      
      if(res.data){
        let roledata = res.data.map((item,index)=>{
          return {srno:index+1,id:item._id,name:item.name,description:item.description}
        })
       
        setUserData(roledata);
      }
      
    })
  }
  

const columns = [
  { field: 'srno', headerName: 'Sr No.', width: 100 },
  { field: 'name', headerName: 'Name', width: 100 },
  { field: 'description', headerName: 'Description', width: 150 },
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
    
      <Link onClick={()=>{
        console.log(params.id)
        axios.delete("http://localhost:3001/api/role/"+params.id)
          .then(()=>{
            fetchUserList();
            setSeverity('success')
            setMessage('User Deleted Successfully.')
            setOpen(true);

          }).catch(()=>{
            fetchUserList();
            setSeverity('error')
            setMessage('Error Occured')
            setOpen(true);
            
          })
      }} ><Delete/></Link>
      <Link onClick={()=>{
        console.log(params.id)
        axios.get("http://localhost:3001/api/role/"+params.id)
          .then((res)=>{
            let data = res.data;
            setRole(data.name);
            setDescription(data.description);
            setRoleId(data._id)
            setAction("Update");
          }).catch(()=>{
            setSeverity('error')
            setMessage('Error Occured')
            setOpen(true);
            
          })
      }} ><Edit/></Link>
    </>
  ),
},
];

  return (
    <div>
      <AlertMessage handleClose={handleClose} open={open} message={message} severity={severity} />
      
      <Card>
        <CardContent style={{ overflowX: 'scroll' }}>
          <Card style={{ padding: '10px' }}>
            <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Role Name"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={disabled}
                  value={role} onChange={(e) => setRole(e.target.value)} />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Description"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={disabled}
                  value={description} onChange={(e) => setDescription(e.target.value)} />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <Button variant='outlined' onClick={()=>saveRole()}>{action}</Button>
              </Grid2>
            </Grid2>

          </Card>
          <RoleList userData={userData} columns={columns} />
        </CardContent>
      </Card>
    </div>
  )
}

export default RoleDetails
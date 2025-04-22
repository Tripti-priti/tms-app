import React, { useState } from 'react'
import AlertMessage from '../shared/AlertMessage'
import { Button, Card, CardContent, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import DialogBox from '../shared/DialogBox';
import { Delete, Edit } from '@mui/icons-material';
const apiUrl = process.env.REACT_APP_API_URL;

const ReleaseSetup = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [releaseNo, setReleaseNo] = useState('');
  const [projectId, setProjectId] = useState('');
  const [action, setAction] = useState('Save');
  const [moduleData, setModuleData] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const handleDelete = async (id, setOpen) => {
    debugger;
    // await axios.delete(apiUrl+"/api/module/"+id).then((res)=>{
    //   console.log(res.data);
    //   setOpen(false);
    //   fetchDetails();
    //   setOpenAlert(true);
    //   setMessage(res.data.message);
    //   if(res.data.message==="Deleted Successfully."){
    //     setSeverity('success')
    //   }else{
    //     setSeverity('warning')
    //   }
    // }).catch((error)=>{
    //   console.log(error);
    // });
  }
  const editModule = (id) => {
    console.log(id);
    // axios.get(apiUrl+"/api/module/"+id).then((res)=>{
    //   setProjectId(res.data.proj_id);
    //   setModuleId(res.data._id);
    //   setModuleName(res.data.name);
    //   setDescription(res.data.description);
    //   setAction('Update');
    // }).catch((error)=>{
    //   console.log(error);
    // })
  }
  const columns = [
    { field: 'srno', headerName: 'Sr No.', width: 100 },
    { field: 'releasenumber', headerName: 'Release Number', width: 300 },
    {
      field: 'action', headerName: 'Action', width: 200
      , valueGetter: (value) => {
        if (!value) {
          return value;
        }
        // Convert the decimal value to a percentage
        return value * 100;
      },
      renderCell: (params) => (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link><DialogBox buttonName={<Delete style={{ color: '#c31414' }} />} id={params.id} handleDelete={handleDelete}></DialogBox> </Link>
            <Link><Edit onClick={() => editModule(params.id)} style={{ color: '#494747' }} /></Link>
          </div>
        </>
      ),
    },
  ];
  const SaveModule = () => {

  }
  return (
    <div>
      <AlertMessage handleClose={handleClose} open={openAlert} message={message} severity={severity} />
      <Card>
        <CardContent >
          <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>

            <Grid2 size={{ xs: 2, sm: 3, md: 3 }} style={{ padding: 0, margin: 0 }}>
              <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                <InputLabel >Project</InputLabel>
                <Select label="Project" style={{ width: '98%' }}
                  value={projectId} onChange={(e) => setProjectId(e.target.value)}
                >
                  <MenuItem value=""><em>---Select---</em></MenuItem>
                  {
                    projectList.map((item, index) => {
                      return <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                    })
                  }

                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 3, md: 3 }} style={{ padding: 0, margin: 0 }}>
              <TextField variant={'outlined'} label={"Release Number"}
                helperText={""} error={false} size="small"
                autoComplete="off" style={{ width: '96%' }}
                value={releaseNo} onChange={(e) => setReleaseNo(e.target.value)}
              />
            </Grid2>

            <Grid2 size={{ xs: 2, sm: 2, md: 2 }} style={{ padding: 0, margin: 0 }}>
              <Button variant='outlined' onClick={() => SaveModule()} >{action}</Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} style={{ padding: 0, margin: 0 }}>
              <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={moduleData} columns={columns} rowHeight={30}
                  slots={{
                    toolbar: GridToolbar,
                  }}
                />
              </div>
            </Grid2>
          </Grid2>

        </CardContent>
      </Card>
    </div>
  )
}

export default ReleaseSetup
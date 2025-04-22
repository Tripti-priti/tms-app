import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { act, useEffect, useState } from 'react'
import AlertMessage from '../shared/AlertMessage';
import { Button, Card, CardContent, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import DialogBox from '../shared/DialogBox';

const ModuleSetup = () => {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const [moduleData, setModuleData] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [description, setDescription] = useState('');
  const [action, setAction] = useState('Save');

  useEffect(()=>{
    fetchDetails();
  },[])
  const fetchDetails = async() =>{
     await axios.get('http://localhost:3001/api/project').then((res)=>{
    
      setProjectList(res.data)
     }).catch((error)=>{
      console.log(error.message)
     })
     await ModuleListData();
     
  }
  const ModuleListData = async () =>{
    await axios.get('http://localhost:3001/api/module').then((res)=>{
      setModuleData(res.data.map((item,index)=>{
      
        return {id:item._id, srno:index+1, projectname:item.proj_id.name, modulename:item.name,description:item.description}
      
      }))
     }).catch((error)=>{
      console.log(error.message)
     })
  }
  const SaveModule = async () =>{
    debugger
    if(action==='Save'){
      await axios.post('http://localhost:3001/api/module',{
        comp_id: "67322719306557f042aba5a7",
        proj_id: projectId,
        name: moduleName,
        description:description
      }).then((res)=>{
        debugger
        console.log(res.data);
        ResetFields();
        setOpen(true);
        setMessage('Saved Successfully');
        setSeverity('success')
        ModuleListData();
      }).catch((error)=>{
        debugger
        console.log(error)
      })
    }
    else if(action==='Update'){
      await axios.put('http://localhost:3001/api/module/'+moduleId,{
        comp_id: "67322719306557f042aba5a7",
        proj_id: projectId,
        name: moduleName,
        description:description
      }).then((res)=>{
        debugger
        console.log(res.data);
        ResetFields();
        setOpen(true);
        setMessage('Updated Successfully');
        setSeverity('success')
        ModuleListData();
        setAction('Save');
      }).catch((error)=>{
        debugger
        console.log(error)
      })
    }
    
  }

const editModule = (id) =>{
  console.log(id);
  axios.get("http://localhost:3001/api/module/"+id).then((res)=>{
    
    setProjectId(res.data.proj_id);
    setModuleId(res.data._id);
    setModuleName(res.data.name);
    setDescription(res.data.description);
    setAction('Update');
  }).catch((error)=>{
    console.log(error);
  })
}
  const ResetFields = () => {
    setProjectId('');
    setModuleName('');
    setDescription('')
  }

  const columns = [
    { field: 'srno', headerName: 'Sr No.', width: 100 },
    { field: 'projectname', headerName: 'Project Name', width: 150 },
    { field: 'modulename', headerName: 'Module Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
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
            <Link  ><DialogBox buttonName={<Delete style={{color:'#c31414'}} />} id={params.id} handleDelete = {handleDelete}></DialogBox> </Link>
            <Link  ><Edit onClick={()=>editModule(params.id)} style={{color:'#494747'}}  /></Link>
          </div>
        </>
      ),
    },
  ];
  const handleDelete = async (id,setOpen) =>{
    debugger;
    await axios.delete("http://localhost:3001/api/module/"+id).then((res)=>{
      console.log(res.data);
      setOpen(false);
      fetchDetails();
      setOpenAlert(true);
      setMessage(res.data.message);
      if(res.data.message==="Deleted Successfully."){
        setSeverity('success')
      }else{
        setSeverity('warning')
      }
    }).catch((error)=>{
      console.log(error);
    });
  }
    const handleClose = (event, reason) => {    
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };



  return (
    
    <div>
    <AlertMessage handleClose={handleClose} open={openAlert} message={message} severity={severity} />
    <Card>
      <CardContent >
        <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid2 size={{ xs: 2, sm: 3, md: 3 }} >
            <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
              <InputLabel >Project</InputLabel>
              <Select label="Project" style={{ width: '98%' }}
                value={projectId} onChange={(e)=>setProjectId(e.target.value)}
              >
                <MenuItem value=""><em>---Select---</em></MenuItem>
                {
                  projectList.map((item,index)=>{
                    return <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                  })
                }
                
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={{ xs: 2, sm: 3, md: 3 }} style={{ padding: 0, margin: 0 }}>
            <TextField variant={'outlined'} label={"Module Name"}
              helperText={""} error={false} size="small"
              autoComplete="off" style={{ width: '96%' }}
              value={moduleName} onChange={(e)=>setModuleName(e.target.value)}
               />
          </Grid2>
          <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
            <TextField variant={'outlined'} label={"Description"}
              helperText={""} error={false} size="small"
              autoComplete="off" style={{ width: '96%' }}
              value={description} onChange={(e)=>setDescription(e.target.value)}
              />
          </Grid2>
          <Grid2 size={{ xs: 2, sm: 2, md: 2 }} style={{ padding: 0, margin: 0 }}>
            <Button variant='outlined' onClick={()=>SaveModule()} >{action}</Button>
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

export default ModuleSetup
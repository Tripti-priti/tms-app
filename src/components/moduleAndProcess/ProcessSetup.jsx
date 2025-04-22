
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { act, useEffect, useState } from 'react'
import AlertMessage from '../shared/AlertMessage';
import { Button, Card, CardContent, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import DialogBox from '../shared/DialogBox';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SubProcessSetup from './SubProcessSetup';

const ProcessSetup = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [moduleList, setModuleList] = useState([]);
  const [moduleId, setModuleId] = useState('');
  const [processName, setProcessName] = useState('');
  const [processId, setProcessId] = useState('');
  const [description, setDescription] = useState('');
  const [processData, setProcessData] = useState([]);
  const [action, setAction] = useState('Save');

  useEffect(() => {
    fetchDetails();
  }, []);
  const fetchDetails = async () => {
    await axios.get('http://localhost:3001/api/project').then((res) => {
     
      setProjectList(res.data)
    }).catch((error) => {
      console.log(error.message)
    })
    await ProcessListData();

  };

const projectchange=async(id)=>{
  setProjectId(id);
  debugger
  await axios.get('http://localhost:3001/api/module/byproject/'+id).then((res) => {
    console.log(res.data);
    setModuleList(res.data)
 
  }).catch((error) => {
    console.log(error.message)
  })
};

  const ProcessListData = async () => {
    await axios.get('http://localhost:3001/api/process').then((res) => {
      setProcessData(res.data.map((item, index) => {
        console.log(item)
        return { id: item._id, srno: index + 1, projectname: item.proj_id.name, modulename: item.module_id===null ? "" : item.module_id.name , processname: item.name, description: item.description }
      }))
    }).catch((error) => {
      console.log(error.message)
    })
  };


  const SaveModule = async () =>{
    debugger
    if(action==='Save'){
      await axios.post('http://localhost:3001/api/process',{
        comp_id: "67322719306557f042aba5a7",
        proj_id: projectId,
        module_id: moduleId,
        name: processName,
        description:description
      }).then((res)=>{
        debugger
        console.log(res.data);
        //ResetFields();
        setOpen(true);
        setMessage('Saved Successfully');
        setSeverity('success')
        resetProcess(action);
        ProcessListData();

      }).catch((error)=>{
    //  
        console.log(error)
      })
    }
    else if(action==='Update'){
      await axios.put('http://localhost:3001/api/process/'+processId,{
        comp_id: "67322719306557f042aba5a7",
        proj_id: projectId,
        module_id: moduleId,
        name: processName,
        description:description
      }).then((res)=>{
        debugger
        console.log(res.data);
        //ResetFields();
        setOpen(true);
        setMessage('Updated Successfully');
        setSeverity('success');
        resetProcess(action);
        ProcessListData();
        setAction('Save');
      }).catch((error)=>{
        debugger
        console.log(error)
      })
    }
    
  }


  const processColumns = [
    { field: 'srno', headerName: 'Sr No.', width: 100 },
    { field: 'projectname', headerName: 'Project Name', width: 150 },
    { field: 'modulename', headerName: 'Module Name', width: 200 },
    { field: 'processname', headerName: 'Process Name', width: 200,
      renderCell: (params) => (
        
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{params.row.processname}</span>
            <Link><SubProcessSetup buttonName={<AccountTreeIcon style={{color:'#0000ff'}} titleAccess='Sub Process' />} id={params.id} handleDelete={handleDelete} /></Link>
          </div>
        </>
      ),
     },
    { field: 'description', headerName: 'Description', width: 150 },
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
            <Link  ><DialogBox buttonName={<Delete style={{color:'#c31414'}} titleAccess='Delete' />} id={params.id} handleDelete={handleDelete} ></DialogBox> </Link>
            <Link  ><Edit onClick={() => editModule(params.id)} style={{color:'#494747'}} titleAccess='Edit' /></Link>
          </div>
        </>
      ),
    },
  ];

  const handleDelete = async (id,setOpen) =>{
    
    await axios.delete("http://localhost:3001/api/process/"+id).then((res)=>{
      console.log(res.data);
      setOpen(false);
      fetchDetails();
    }).catch((error)=>{
      console.log(error);
    });
  };


  const editModule = (id) =>{
    console.log(id);
    axios.get("http://localhost:3001/api/process/"+id).then((res)=>{
      console.log(res.data);
      setProjectId(res.data.proj_id);
      projectchange(res.data.proj_id).then((res1)=>{
        setModuleId(res.data.module_id);
        setProcessId(res.data._id);
        setProcessName(res.data.name);
        setDescription(res.data.description);
        setAction('Update');
      });
      
    }).catch((error)=>{
      console.log(error);
    })
  };

  const resetProcess = (flag)=>{
    if(flag==='Save'){
    // setProjectId("");
    // setModuleId("");
    setProcessName("");
    // setProcessId("");
    setDescription("");
    }else{
    setProjectId("");
    setModuleId("");
    setProcessName("");
    setProcessId("");
    setDescription("");
    }
    
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <AlertMessage handleClose={handleClose} open={open} message={message} severity={severity} />
      <Card>
        <CardContent >
          <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid2 size={{ xs: 2, sm: 3, md: 3 }} >
              <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                <InputLabel >Project</InputLabel>
                <Select label="Project" style={{ width: '98%' }}
                  value={projectId} onChange={(e) => projectchange(e.target.value)}
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
            <Grid2 size={{ xs: 2, sm: 3, md: 3 }} >
              <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                <InputLabel >Module</InputLabel>
                <Select label="Module" style={{ width: '98%' }}
                  value={moduleId} onChange={(e) => setModuleId(e.target.value)}
                >
                  <MenuItem value=""><em>---Select---</em></MenuItem>
                  {
                    moduleList.map((item, index) => {
                      return <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                    })
                  }

                </Select>
              </FormControl>
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 3, md: 3 }} style={{ padding: 0, margin: 0 }}>
              <TextField variant={'outlined'} label={"Process Name"}
                helperText={""} error={false} size="small"
                autoComplete="off" style={{ width: '96%' }}
                disabled={disabled}
                value={processName} onChange={(e) => setProcessName(e.target.value)} />
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 3, md: 8 }} style={{ padding: 0, margin: 0 }}>
              <TextField variant={'outlined'} label={"Description"}
                helperText={""} error={false} size="small"
                autoComplete="off" style={{ width: '96%' }}
                disabled={disabled}
                value={description} onChange={(e) => setDescription(e.target.value)} />
            </Grid2>
            <Grid2 size={{ xs: 2, sm: 3, md: 3 }} style={{ padding: 0, margin: 0 }}>
              <Button variant='outlined' className='mx-2'  onClick={()=>SaveModule()}>{action}</Button>
              <Button variant='outlined' className='mx-2' onClick={()=>resetProcess("reset")}>Reset</Button>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 12, md: 12 }} style={{ padding: 0, margin: 0 }}>
              <DataGrid rows={processData} columns={processColumns} rowHeight={30}
                slots={{
                  toolbar: GridToolbar,
                }}
              />
            </Grid2>
          </Grid2>

        </CardContent>
      </Card>
    </div>
  )
}

export default ProcessSetup
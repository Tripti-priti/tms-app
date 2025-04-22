import { Button, Card, CardContent, Grid2, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Delete, Edit } from '@mui/icons-material';
import AlertMessage from '../shared/AlertMessage';
import ProjectList from './ProjectList';
const apiUrl = process.env.REACT_APP_API_URL;

const ProjectDetails = () => {
  const [project, setProject] = useState("");
  const [description,setDescription]=useState("");
  const [projectData,setProjectData] = useState([]);
  const [action,setAction]=useState("Create");
  const [open,setOpen]=useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const [projectId,setProjectId]=useState();

  const saveProject=()=>{
  
    if (action === 'Create') {
   
      axios.post(apiUrl+'/api/project',
        {
          "comp_id": "67322719306557f042aba5a7",
          "name" :project,
          "description":description   
        }
    ).then((res) => {
        setSeverity('success')
        setMessage("Record Saved Successfully.")
        setOpen(true);
        setProject("");
        setDescription("");
        setProjectId("");
        fetchUserList();
      })   .catch((err) => {
        setSeverity('error')
        setMessage(err.message)
        setOpen(true);
    })
  
    }
  else {
  
    axios.put(apiUrl+'/api/project/' + projectId, {
      "comp_id": "67322719306557f042aba5a7",
      "name" :project,
      "description":description,
      "mod_dt":Date.now()
    })
        .then(() => {
            setSeverity('success')
            setMessage("Record Updated Successfully.")
            setOpen(true);
            setProject("");
            setDescription("");
            setProjectId("");
            setAction("Create")
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
      axios.get(apiUrl+'/api/project')
      .then((res)=>{
        
        if(res.data){
          let roledata = res.data.map((item,index)=>{
            return {srno:index+1,id:item._id,name:item.name,description:item.description}
          });
          setProjectData(roledata);
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
      <div style={{display:'flex',justifyContent:'space-around'}}>
        <Link onClick={()=>{DeleteProject(params.id)}} ><Delete style={{color:'#c31414'}} /></Link>
        <Link onClick={()=>{EditProject(params.id)}} ><Edit style={{color:'#494747'}} /></Link>
      </div>
      </>
    ),
  },
  ];
  const EditProject = (id)=>{
    axios.get(apiUrl+"/api/project/"+id)
    .then((res)=>{
      let data = res.data;
      setProject(data.name);
      setDescription(data.description);
      setProjectId(data._id)
      setAction("Update");
    }).catch(()=>{
      setSeverity('error')
      setMessage('Error Occured')
      setOpen(true);
      
    })
  }
  const DeleteProject = (id) => {
    axios.delete(apiUrl+"/api/project/"+id)
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
  }
  return (
    <div>
       <AlertMessage handleClose={handleClose} open={open} message={message} severity={severity} />
      
       <Card>
        <CardContent style={{ overflowX: 'scroll' }}>
          <Card style={{ padding: '10px' }}>
            <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Project Name"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={disabled}
                  value={project} onChange={(e) => setProject(e.target.value)} />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Description"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={disabled}
                  value={description} onChange={(e) => setDescription(e.target.value)} />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <Button variant='outlined' onClick={()=>saveProject()}>{action}</Button>
              </Grid2>
            </Grid2>

          </Card>
          <ProjectList userData={projectData} columns={columns}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectDetails
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Box, Card, Grid2, TextField } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { X } from '@mui/icons-material';

const SubProcessSetup = (props) => {

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [projectName, setProjectName] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [processName, setProcessName] = useState('');
  const [processId, setProcessId] = useState('');
  const [subProcessName, setSubProcessName] = useState('');
  const [subProcessList, setSubProcessList] = useState([]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const getProcessInfo = (id) => {
    debugger;
    console.log(id);
    axios.get("http://localhost:3001/api/process/info/" + id).then((res) => {
      debugger;
      console.log(res.data);
      setProjectName(res.data.proj_id.name);
      setModuleName(res.data.module_id.name);
      setProcessId(res.data._id);
      setProcessName(res.data.name);
      if(res.data.subprocess){
        setSubProcessList(res.data.subprocess);
      }
    }).catch((error) => {
      console.log(error);
    })
  };
  const AddSubProcess = () => {
    debugger;
    setSubProcessList([...subProcessList, {name:subProcessName,description:''}]);
    setSubProcessName('');
  }
  const DeleteSubProcess = (data) =>{
    debugger;
    setSubProcessList(subProcessList.filter(v=>v.name!==data))
  }
  const handleClickOpen = (_id) => {
    setOpen(true);
    setId(_id);
    getProcessInfo(_id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const SaveModule = async () =>{
    debugger
    await axios.put('http://localhost:3001/api/process/'+processId,{
      comp_id: "67322719306557f042aba5a7",
      name: processName,
      subprocess:subProcessList
    }).then((res)=>{
     console.log(res);
     handleClose();
    }).catch((error)=>{
      debugger
      console.log(error)
    })
    
  }
  return (
    <React.Fragment>
      <span variant="outlined" onClick={() => { handleClickOpen(props.id) }}>
        {props.buttonName}
      </span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Sub Process Details"}
        </DialogTitle>
        <DialogContent>
          <Card style={{ width: '550px', height: '280px' }}>
            <Grid2 container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} style={{ padding: 5 }}>
              <Grid2 size={{ xs: 3, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Project Name"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={'disabled'}
                  value={projectName} />
              </Grid2>
              <Grid2 size={{ xs: 3, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Module Name"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={'disabled'}
                  value={moduleName} />
              </Grid2>
              <Grid2 size={{ xs: 3, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Process Name"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={true}
                  value={processName} />
              </Grid2>
              <Grid2 size={{ xs: 3, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Sub Process Name"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  value={subProcessName} onChange={(e) => setSubProcessName(e.target.value)} />

              </Grid2>
              <Grid2 style={{ padding: 10, margin: 0 }}>
                <button onClick={()=>AddSubProcess()} style={{border:'none',backgroundColor:'transparent'}}><AddCircleIcon style={{ color: '#3e3efa' }}  /></button>
              </Grid2>
              <Grid2 size={12} style={{ padding: 0, margin: 0, display: 'flex',flexWrap:'wrap' }}>
                {
                  subProcessList.map((item) => {
                    return <Box style={{ border: '1px solid grey', borderRadius: '4px'
                      , margin: '2px', padding: '2px 8px' }}>{item.name} <CloseIcon style={{fontSize:'14px'}} onClick={()=>DeleteSubProcess(item.name)} /></Box>
                  })
                }

              </Grid2>
            </Grid2>
          </Card>
        </DialogContent>
        <DialogActions>

          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={SaveModule}>
            Save & Exit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default SubProcessSetup
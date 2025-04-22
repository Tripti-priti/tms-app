import React, { useState } from 'react'
import AlertMessage from '../shared/AlertMessage';
import {
  Accordion, accordionClasses, AccordionDetails, accordionDetailsClasses
  , AccordionSummary, Button, Card, CardActions, Fade, FormControl, Grid2, InputLabel, MenuItem
  , Select, TextareaAutosize, TextField, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import MyDropzone from '../shared/MyDropzone';
import Assignment from './Assignment';
import { Link } from 'react-router-dom';
import Devlopment from './Devlopment';
import UnitTest from './UnitTest';
import Deployment from './Deployment';
const apiUrl = process.env.REACT_APP_API_URL;
const UserTicketDetails = () => {
const [imgSrc,setImgSrc] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [projectId, setProjectId] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [clientId, setClientId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [moduleList, setModuleList] = useState([]);
  const [processId, setProcessId] = useState("");
  const [processList, setProcessList] = useState([]);
  const [subProcessName, setSubProcessName] = useState("");
  const [subProcessList, setSubProcessList] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [tikectType, setTicketType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [roleId, setRoleId] = useState();
  const [role, setProject] = useState("");
  const [action, setAction] = useState("Save");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const FieldSize = { xs: 2, sm: 4, md: 3 }
  const DescriptionSize = { xs: 2, sm: 6, md: 6 }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    fetchDetails();
   
  }, []);


  const fetchDetails = async () => {
    await axios.get(apiUrl+'/api/project').then((res) => {

      setProjectList(res.data)
    }).catch((error) => {
      console.log(error.message)
    })
  };

  const projectChange = async (id) => {
    setProjectId(id);

    await axios.get(apiUrl+'/api/module/byproject/' + id).then((res) => {
      setModuleList(res.data);
      console.log(res.data)
    }).catch((error) => {
      console.log(error.message)
    })
  };


  const moduleChange = async (id) => {
    setModuleId(id);
    debugger
    await axios.get(apiUrl+'/api/process/modid/' + id).then((res) => {
      console.log(res.data)
      setProcessList(res.data);
    }).catch((error) => {
      console.log(error.message)
    })
  };

  const processChange = async (id) => {
    setProcessId(id);
    debugger
    await axios.get(apiUrl+'/api/process/' + id).then((res) => {
      console.log(res.data)
      debugger;
      setSubProcessList(res.data.subprocess === null || res.data.subprocess === undefined ? [] : res.data.subprocess);
    }).catch((error) => {
      console.log(error.message)
    })
  };

  const subProcessChange = async (name) => {
    debugger
    setSubProcessName(name);

  };


  const saveTicket = async () => {
   
    const str = JSON.parse(localStorage.userLoginDetails)[0];
    if (action === 'Save') {
      let attachmentfiles =[];
      const formdata = new FormData();
      imgSrc.map((item)=>{
        debugger
        formdata.append("images",item);
        attachmentfiles.push({attach_name:item.name,path:""})
      });
    debugger;
      console.log(formdata)
      // Append other form data (text fields)
      formdata.append("comp_id", str.comp_id._id);
      formdata.append("client_id", "6746dc54889e69a54ed8293d");
      formdata.append("proj_id", projectId);
      formdata.append("module_id",moduleId);
      formdata.append("process_id",processId);
      formdata.append("sub_process",subProcessName);
      formdata.append("ticket_no",1000);
      formdata.append("ticket_type",tikectType);
      formdata.append("priority",priority);
      formdata.append("ticket_desc",description);
      formdata.append("status","p");
      formdata.append("report_by",str._id);
      // formdata.append("attachment",JSON.stringify(attachmentfiles));
      console.log(formdata)


      const data = {
        
        comp_id: str.comp_id._id,
        client_id: "6746dc54889e69a54ed8293d",
        proj_id: projectId,
        module_id: moduleId,
        process_id: processId,
        sub_process: subProcessName,
        ticket_type: tikectType,
        priority: priority,
        ticket_desc: description,
        status: 'P',
        report_by: str._id,
      }
      try {
        const response = await axios.post(apiUrl+"/api/ticket", formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        //setMessage(response.data.message);
        console.log(response.data.message)
        console.log("Images uploaded successfully!")
      } catch (error) {
        //setMessage("Upload failed!");
        console.log("Upload failed!")
      }

      // axios.post(apiUrl+'/api/ticket', formdata, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // })
return false;
      axios.post(apiUrl+'/api/ticket', data).then((res) => {
        setSeverity('success');
        console.log(res.data);
        setTicketId(res.data._id);
        
        setMessage("Record Saved Successfully.");
        setOpen(true);
        setDisabled(true);
        setAction("Edit");
      }).catch((error) => {
        setSeverity('error');
        setMessage(error.message);
        setOpen(true);
        console.log(error)
      });
    }
    else {
      if (action === "Edit") {
        setAction("Update");
        setDisabled(false);
      }
      else {
        const updateData = {
          comp_id: str.comp_id._id,
          client_id: "6746dc54889e69a54ed8293d",
          proj_id: projectId,
          module_id: moduleId,
          process_id: processId,
          sub_process: subProcessName,
          ticket_type: tikectType,
          priority: priority,
          ticket_desc: description,
          status: 'P',
          report_by: str._id
  
        }   
        axios.put(apiUrl+'/api/ticket/'+ticketId, updateData).then((res) => {
          setSeverity('success');        
          console.log(res.data);
          setMessage("Updated Successfully.");
          setOpen(true);
          setDisabled(true);
          setAction("Edit");
        }).catch((error) => {
          setSeverity('error');
          setMessage(error.message);
          setOpen(true);
          console.log(error)
        });
      }     
      }
    }
  

    const newTicket = () =>{
      setDisabled(false); 
      setProjectId("");
  setProcessList([]);
      setModuleId("");      
  setModuleList([]);
      setProcessId("");
      setProcessList([]);
      setSubProcessList([])
      setSubProcessName("");   
      setTicketType("");
      setPriority("");
      setDescription("");
      setAction("Save");
    }


  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  // const handleChange = (e) => {
  //   alert(1)
  //   debugger
  //   const files = Array.from(e.target.files);
  //   console.log(files);
  //   setImgSrc(files);
  // };

  return (
    <div>
      <AlertMessage handleClose={handleClose} open={open} message={message} severity={severity} />
      <Card style={{ outline: '1px solid #bdbdbd' }}>
        <CardActions style={{ justifyContent: 'space-between' }}>
          <div style={{ width: '550px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontFamily: 'cursive' }}>
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column' }}>
              <span>Created By</span>
              <span>Suraj Maurya</span>
            </div>
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column' }}>
              <span>Created on</span>
              <span>03-01-2025</span>
            </div>
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column' }}>
              <span>Amend By</span>
              <span>Suraj Maurya</span>
            </div>
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column' }}>
              <span>Amend on</span>
              <span>03-01-2025</span>
            </div>
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column' }}>
              <span>Status</span>
              <span>Pending</span>
            </div>
          </div>
          <div style={{ width: '270px', display: 'flex', justifyContent: 'space-around' }}>
            <Button variant='contained' size='small' disabled = {action==='Save' ? {disabled} : ''} onClick={()=>newTicket()}>New</Button>
            <Button variant='contained' size='small' onClick={() => saveTicket()}>{action}</Button>
            <Button variant='contained' size='small'>Print</Button>
            <Link to={'/userTickets'}><Button variant='contained' size='small'>Back</Button></Link>
          </div>

        </CardActions>
      </Card>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        slots={{ transition: Fade }}
        slotProps={{ transition: { timeout: 400 } }}
        sx={[
          expanded
            ? {
              [`& .${accordionClasses.region}`]: {
                height: 'auto',
              },
              [`& .${accordionDetailsClasses.root}`]: {
                display: 'block',
              },
            }
            : {
              [`& .${accordionClasses.region}`]: {
                height: 0,
              },
              [`& .${accordionDetailsClasses.root}`]: {
                display: 'none',
              },
            },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          style={{ backgroundColor: '#daebfd' }}
        >
          <Typography>Ticket Details</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Card style={{ padding: '10px' }}>
            <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid2 size={FieldSize} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Project</InputLabel>
                  <Select disabled={disabled} label="Project" style={{ width: '98%' }}
                    value={projectId} onChange={(e) => projectChange(e.target.value)}>
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    {
                      projectList.map((item, index) => {
                        return <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                      })
                    }



                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={FieldSize} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Module</InputLabel>
                  <Select disabled={disabled} label="Module" style={{ width: '98%' }}

                    value={moduleId} onChange={(e) => moduleChange(e.target.value)}
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
              <Grid2 size={FieldSize} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Process</InputLabel>
                  <Select disabled={disabled} label="Process" style={{ width: '98%' }}
                    value={processId} onChange={(e) => processChange(e.target.value)}>

                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    {
                      processList.map((item, index) => {
                        return <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                      })
                    }

                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={FieldSize} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Sub Process</InputLabel>
                  <Select disabled={disabled} label="Sub Process" style={{ width: '98%' }}
                    value={subProcessName} onChange={(e) => setSubProcessName(e.target.value)}
                  >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    {
                      subProcessList.map((item, index) => {
                        return <MenuItem value={item.name} key={index}>{item.name}</MenuItem>
                      }
                      )}

                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={FieldSize} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Ticket Type</InputLabel>
                  <Select disabled={disabled} label="Ticket Type" style={{ width: '98%' }}
                    onChange={(e) => setTicketType(e.target.value)} value={tikectType}>
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'B'}>Bug</MenuItem>
                    <MenuItem value={'E'}>Enhancement</MenuItem>
                    <MenuItem value={'S'}>Support</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={FieldSize} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Priority</InputLabel>
                  <Select disabled={disabled} label="Priority" style={{ width: '98%' }}
                    value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'L'}>Low</MenuItem>
                    <MenuItem value={'M'}>Medium</MenuItem>
                    <MenuItem value={'H'}>High</MenuItem>
                    <MenuItem value={'S'}>Show Topper</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              {/* <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <Button variant='outlined' >{action}</Button>
              </Grid2> */}

              <Grid2 size={DescriptionSize} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Description"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={disabled}
                  multiline
                  minRows={3}
                  maxRows={8}
                  value={description} onChange={(e) => setDescription(e.target.value)} />
              </Grid2>
              <div style={{ border: '1px solid #bdbdbd', padding: '10px', width: '100%' }}>
                <MyDropzone imgSrc={imgSrc} setImgSrc={setImgSrc}  />
              </div>

            </Grid2>

          </Card>
        </AccordionDetails>
      </Accordion>
      <Assignment />
      <Devlopment/>
      <UnitTest/>
      <Deployment/>

    </div>
  )
}

export default UserTicketDetails
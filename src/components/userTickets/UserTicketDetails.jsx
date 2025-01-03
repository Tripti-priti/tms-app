import React, { useState } from 'react'
import AlertMessage from '../shared/AlertMessage';
import {
  Accordion, accordionClasses, AccordionDetails, accordionDetailsClasses
  , AccordionSummary, Button, Card, CardActions, Fade, FormControl, Grid2, InputLabel, MenuItem
  , Select, TextareaAutosize, TextField, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
const UserTicketDetails = () => {

  const [expanded, setExpanded] = useState(true);
  const [projectId, setProjectId] = useState("");
  const [clientId, setClientId] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [processId, setProcessId] = useState("");
  const [subProcessId, setSubProcessId] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [tikectType, setTicketType] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [role, setProject] = useState("");
  const [action, setAction] = useState("Create");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const [roleId, setRoleId] = useState();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    // fetchUserList();
  }, [])

  const FetchAllDropDownsData = () =>{
    axios.get('')
  }

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  return (
    <div>
      <AlertMessage handleClose={handleClose} open={open} message={message} severity={severity} />
      <Card style={{outline:'1px solid #bdbdbd'}}>
        <CardActions style={{justifyContent:'space-between'}}>
        <div style={{width:'550px',display:'flex',justifyContent:'space-between',fontSize:'13px',fontFamily:'cursive'}}>
          <div style={{width:'100px',display:'flex',flexDirection:'column'}}>
            <span>Created By</span>
            <span>Suraj Maurya</span>
          </div>
          <div style={{width:'100px',display:'flex',flexDirection:'column'}}>
            <span>Created on</span>
            <span>03-01-2025</span>
          </div>
          <div style={{width:'100px',display:'flex',flexDirection:'column'}}>
            <span>Amend By</span>
            <span>Suraj Maurya</span>
          </div>
          <div style={{width:'100px',display:'flex',flexDirection:'column'}}>
            <span>Amend on</span>
            <span>03-01-2025</span>
          </div>
          <div style={{width:'100px',display:'flex',flexDirection:'column'}}>
            <span>Status</span>
            <span>Pending</span>
          </div>
          </div>
          <div style={{width:'270px',display:'flex',justifyContent:'space-around'}}>
          <Button variant='contained' size='small'>New</Button>
          <Button variant='contained' size='small'>Save</Button>
          <Button variant='contained' size='small'>Print</Button>
          <Button variant='contained' size='small'>Back</Button>
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
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Project</InputLabel>
                  <Select disabled={disabled} label="Project" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'Mr'}>Mr.</MenuItem>
                    <MenuItem value={'Mis'}>Miss.</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Module</InputLabel>
                  <Select disabled={disabled} label="Module" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'Mr'}>Mr.</MenuItem>
                    <MenuItem value={'Mis'}>Miss.</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Process</InputLabel>
                  <Select disabled={disabled} label="Process" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'Mr'}>Mr.</MenuItem>
                    <MenuItem value={'Mis'}>Miss.</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Sub Process</InputLabel>
                  <Select disabled={disabled} label="Sub Process" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'Mr'}>Mr.</MenuItem>
                    <MenuItem value={'Mis'}>Miss.</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Ticket Type</InputLabel>
                  <Select disabled={disabled} label="Ticket Type" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'B'}>Bug</MenuItem>
                    <MenuItem value={'E'}>Enhancement</MenuItem>
                    <MenuItem value={'S'}>Support</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Priority</InputLabel>
                  <Select disabled={disabled} label="Ticket Type" style={{ width: '98%' }}
                    >
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

              <Grid2 size={{ xs: 2, sm: 6, md: 6 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Description"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={disabled}
                  multiline
                  minRows={3}
                  maxRows={8}
                  value={description} onChange={(e) => setDescription(e.target.value)} />
              </Grid2>
           
              
            </Grid2>

          </Card>
        </AccordionDetails>
      </Accordion>
      
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
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Project</InputLabel>
                  <Select disabled={disabled} label="Project" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'Mr'}>Mr.</MenuItem>
                    <MenuItem value={'Mis'}>Miss.</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Module</InputLabel>
                  <Select disabled={disabled} label="Module" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'Mr'}>Mr.</MenuItem>
                    <MenuItem value={'Mis'}>Miss.</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Process</InputLabel>
                  <Select disabled={disabled} label="Process" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'Mr'}>Mr.</MenuItem>
                    <MenuItem value={'Mis'}>Miss.</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Sub Process</InputLabel>
                  <Select disabled={disabled} label="Sub Process" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'Mr'}>Mr.</MenuItem>
                    <MenuItem value={'Mis'}>Miss.</MenuItem>
                    <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                  <InputLabel >Ticket Type</InputLabel>
                  <Select disabled={disabled} label="Ticket Type" style={{ width: '98%' }}
                    >
                    <MenuItem value=""><em>---Select---</em></MenuItem>
                    <MenuItem value={'B'}>Bug</MenuItem>
                    <MenuItem value={'E'}>Enhancement</MenuItem>
                    <MenuItem value={'F'}>Feature</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <Button variant='outlined' >{action}</Button>
              </Grid2>

              <Grid2 size={{ xs: 2, sm: 6, md: 6 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Description"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  disabled={disabled}
                  multiline
                  minRows={3}
                  maxRows={8}
                  value={description} onChange={(e) => setDescription(e.target.value)} />
              </Grid2>
           
              
            </Grid2>

          </Card>
        </AccordionDetails>
      </Accordion>

    </div>
  )
}

export default UserTicketDetails
import React, { useState } from 'react'
import AlertMessage from '../shared/AlertMessage';
import {
    Accordion, accordionClasses, AccordionDetails, accordionDetailsClasses
    , AccordionSummary, Button, Card, CardActions, Fade, FormControl, FormControlLabel, FormGroup, Grid2, InputLabel, MenuItem
    , Select, Switch, TextareaAutosize, TextField, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import MyDropzone from '../shared/MyDropzone';
import { format } from 'date-fns';

const Assignment = () => {
    const [imgSrc,setImgSrc] = useState([]);
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
    const [asignedDate, setAsignedDate] = useState(format(Date(), 'yyyy-MM-dd'));
    const [targetDate, setTargetDate] = useState(format(Date(), 'yyyy-MM-dd'));
    const [unitTest, setUnitTest] = useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    React.useEffect(() => {
        // fetchUserList();
        const currentDate = new Date();
        console.log("Date : " +format(Date(), 'yyyy-MM-dd'))
    }, [])

    const FetchAllDropDownsData = () => {
        axios.get('')
    }

    const handleExpansion = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };
    return (
        <div>
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
                    <Typography>Assignment Details</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Card style={{ padding: '10px' }}>
                        <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                        <FormControl variant={'outlined'} size="small" style={{ width: '100%' }}>
                            
                                    <TextField variant={'standard'}
                                    label={'Assigned date'}
                                    helperText={""} error={false} size="small"
                                    autoComplete="off" style={{ width: '96%' }}
                                    disabled={disabled}
                                    type='date'
                                    value={asignedDate} onChange={(e) => setAsignedDate(e.target.value)} />
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                                                 <InputLabel >Ticket Type</InputLabel>
                                                 <Select disabled={disabled} label="Ticket Type" style={{ width: '98%' }}>
                                                   <MenuItem value=""><em>---Select---</em></MenuItem>
                                                   <MenuItem value={'B'}>Bug</MenuItem>
                                                   <MenuItem value={'E'}>Enhancement</MenuItem>
                                                   <MenuItem value={'S'}>Support</MenuItem>
                                                 </Select>
                                               </FormControl>
                            </Grid2>
                            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                                                <InputLabel >Priority</InputLabel>
                                                <Select disabled={disabled} label="Priority" style={{ width: '98%' }}>
                                                  <MenuItem value=""><em>---Select---</em></MenuItem>
                                                  <MenuItem value={'L'}>Low</MenuItem>
                                                  <MenuItem value={'M'}>Medium</MenuItem>
                                                  <MenuItem value={'H'}>High</MenuItem>
                                                  <MenuItem value={'S'}>Show Topper</MenuItem>
                                                </Select>
                                              </FormControl>
                            </Grid2>
                            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                                    <InputLabel >Assign to</InputLabel>
                                    <Select disabled={disabled} label="Assign to" style={{ width: '98%' }}
                                    >
                                        <MenuItem value=""><em>---Select---</em></MenuItem>
                                        <MenuItem value={'1001'}>Suraj Maurya</MenuItem>
                                        <MenuItem value={'1002'}>Priti Verma</MenuItem>
                                        <MenuItem value={'1003'}>Shubham Maurya</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                                <TextField variant={'standard'}
                                    label={'Estimated Completion Date'}
                                    helperText={""} error={false} size="small"
                                    autoComplete="off" style={{ width: '96%' }}
                                    disabled={disabled}
                                    type='date'
                                    value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
                            </Grid2>
                            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                                <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                                    <InputLabel >Release Number</InputLabel>
                                    <Select disabled={disabled} label="Release Number" style={{ width: '98%' }}
                                    >
                                        <MenuItem value=""><em>---Select---</em></MenuItem>
                                        <MenuItem value={'13012025'}>13012025</MenuItem>
                                        <MenuItem value={'30012025'}>30012025</MenuItem>
                                        <MenuItem value={'15022025'}>15022025</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch checked={unitTest} disabled={disabled} onChange={() => setUnitTest(!unitTest)} />} label="Unit Test" />
                                </FormGroup>
                            </Grid2>

                            <Grid2 size={{ xs: 2, sm: 6, md: 6 }} style={{ padding: 0, margin: 0 }}>
                                <TextField variant={'outlined'} label={"Remarks"}
                                    helperText={""} error={false} size="small"
                                    autoComplete="off" style={{ width: '96%' }}
                                    disabled={disabled}
                                    multiline
                                    minRows={3}
                                    maxRows={8}
                                    value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Grid2>
                            <div style={{ border: '1px solid #bdbdbd', padding: '10px', width: '100%' }}>
                                <MyDropzone imgSrc={imgSrc} setImgSrc={setImgSrc} />
                            </div>

                        </Grid2>

                    </Card>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Assignment
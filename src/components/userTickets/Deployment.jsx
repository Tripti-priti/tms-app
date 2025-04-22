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
const Deployment = () => {
    const [imgSrc,setImgSrc] = useState([]);
    const [expanded, setExpanded] = useState(true);
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [asignedDate, setAsignedDate] = useState(format(Date(), 'yyyy-MM-dd'));
   
    React.useEffect(() => {
        // fetchUserList();
        const currentDate = new Date();
        console.log("Date : " +format(Date(), 'yyyy-MM-dd'))
    }, [])

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
                    <Typography>Deployment Details</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Card style={{ padding: '10px' }}>
                        <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                        <FormControl variant={'outlined'} size="small" style={{ width: '100%' }}>
                            
                                    <TextField variant={'standard'}
                                    label={'Start date'}
                                    helperText={""} error={false} size="small"
                                    autoComplete="off" style={{ width: '96%' }}
                                    disabled={disabled}
                                    type='date'
                                    value={asignedDate} onChange={(e) => setAsignedDate(e.target.value)} />
                                </FormControl>
                            </Grid2>
                            <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                        <FormControl variant={'outlined'} size="small" style={{ width: '100%' }}>
                            
                                    <TextField variant={'standard'}
                                    label={'Completed date'}
                                    helperText={""} error={false} size="small"
                                    autoComplete="off" style={{ width: '96%' }}
                                    disabled={disabled}
                                    type='date'
                                    value={asignedDate} onChange={(e) => setAsignedDate(e.target.value)} />
                                </FormControl>
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

export default Deployment
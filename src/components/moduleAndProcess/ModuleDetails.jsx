import * as React from 'react';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Fade from '@mui/material/Fade';
import ProjectList from '../projects/ProjectList';
import AlertMessage from '../shared/AlertMessage';
import Grid2 from '@mui/material/Grid2'
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'
import ModuleSetup from './ModuleSetup';
import ProcessSetup from './ProcessSetup';
import SubProcessSetup from './SubProcessSetup';

const ModuleDetails = () => {
  const [expanded, setExpanded] = useState(true);
  const [role, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [moduleData, setModuleData] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [subProcessData, setSubProcessData] = useState([]);
  const [action, setAction] = useState("Create");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const [roleId, setProjectId] = useState();

  const options = [
    { name: 'Swedish', value: 'sv' },
    { name: 'English', value: 'en' },
    {
      type: 'group',
      name: 'Group name',
      items: [
        { name: 'Spanish', value: 'es' },
      ]
    },
  ];
  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const columns = [
    { field: 'srno', headerName: 'Sr No.', width: 100 },
    { field: 'projectname', headerName: 'Project Name', width: 150 },
    { field: 'modulename', headerName: 'Module Name', width: 150 },
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
            <Link  ><Delete /></Link>
            <Link  ><Edit /></Link>
          </div>
        </>
      ),
    },
  ];
  const processColumns = [
    { field: 'srno', headerName: 'Sr No.', width: 100 },
    { field: 'projectname', headerName: 'Project Name', width: 150 },
    { field: 'modulename', headerName: 'Module Name', width: 150 },
    { field: 'processname', headerName: 'Process Name', width: 150 },
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
            <Link  ><Delete /></Link>
            <Link  ><Edit /></Link>
          </div>
        </>
      ),
    },
  ];
  const subProcessColumns = [
    { field: 'srno', headerName: 'Sr No.', width: 100 },
    { field: 'projectname', headerName: 'Project Name', width: 150 },
    { field: 'modulename', headerName: 'Module Name', width: 150 },
    { field: 'processname', headerName: 'Process Name', width: 150 },
    { field: 'subprocessname', headerName: 'Sub Process Name', width: 150 },
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
            <Link  ><Delete /></Link>
            <Link  ><Edit /></Link>
          </div>
        </>
      ),
    },
  ];
  return (
    <div>
      {/* ---------- Module Setup Start --------- */}

      <Accordion
        expanded={expanded}
        // style={{height:'10px'}}
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
          style={{ backgroundColor: '#daebfd',height:'45px !important',margin:'0' }}

        >
          <Typography>Module Setup</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ModuleSetup/>
        </AccordionDetails>
      </Accordion>
      {/* ---------- Module Setup End --------- */}

      {/* ---------- Process Setup Start --------- */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{ backgroundColor: '#daebfd' }}
        >
          <Typography>Process Setup</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ProcessSetup/>
        </AccordionDetails>
      </Accordion>
      {/* ---------- Process Setup End --------- */}

       {/* ---------- Sub Process Setup Start --------- */}
       <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          style={{ backgroundColor: '#daebfd' }}
        >
          <Typography>Sub Process Setup</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <SubProcessSetup/> */}
          {/* <div>
            <AlertMessage handleClose={handleClose} open={open} message={message} severity={severity} />

            <Card>
              <CardContent >
                <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <Grid2 size={{ xs: 2, sm: 3, md: 3 }} >
                    <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                      <InputLabel >Project</InputLabel>
                      <Select disabled={false} label="Project" style={{ width: '98%' }}>
                        <MenuItem value=""><em>---Select---</em></MenuItem>
                        <MenuItem value={'1001'}>TMS</MenuItem>
                        <MenuItem value={'1002'}>EnRep</MenuItem>
                        <MenuItem value={'1003'}>Businet</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 2, sm: 3, md: 3 }} >
                    <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                      <InputLabel >Module</InputLabel>
                      <Select disabled={false} label="Module" style={{ width: '98%' }}>
                        <MenuItem value=""><em>---Select---</em></MenuItem>
                        <MenuItem value={'1001'}>TMS</MenuItem>
                        <MenuItem value={'1002'}>EnRep</MenuItem>
                        <MenuItem value={'1003'}>Businet</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 2, sm: 3, md: 3 }} >
                    <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
                      <InputLabel >Process</InputLabel>
                      <Select disabled={false} label="Process" style={{ width: '98%' }}>
                        <MenuItem value=""><em>---Select---</em></MenuItem>
                        <MenuItem value={'1001'}>TMS</MenuItem>
                        <MenuItem value={'1002'}>EnRep</MenuItem>
                        <MenuItem value={'1003'}>Businet</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ xs: 2, sm: 3, md: 3 }} style={{ padding: 0, margin: 0 }}>
                    <TextField variant={'outlined'} label={"Suc Process Name"}
                      helperText={""} error={false} size="small"
                      autoComplete="off" style={{ width: '96%' }}
                      disabled={disabled}
                      value={role} onChange={(e) => setProject(e.target.value)} />
                  </Grid2>
                  <Grid2 size={{ xs: 2, sm: 3, md: 8 }} style={{ padding: 0, margin: 0 }}>
                    <TextField variant={'outlined'} label={"Description"}
                      helperText={""} error={false} size="small"
                      autoComplete="off" style={{ width: '96%' }}
                      disabled={disabled}
                      value={description} onChange={(e) => setDescription(e.target.value)} />
                  </Grid2>
                  <Grid2 size={{ xs: 2, sm: 3, md: 3 }} style={{ padding: 0, margin: 0 }}>
                    <Button variant='outlined' >{action}</Button>
                  </Grid2>
                  <Grid2 size={{ xs: 12, sm: 12, md: 12 }} style={{ padding: 0, margin: 0 }}>
                    <DataGrid rows={subProcessData} columns={subProcessColumns} rowHeight={30}
                      slots={{
                        toolbar: GridToolbar,
                      }}
                    />
                  </Grid2>
                </Grid2>

              </CardContent>
            </Card>
          </div> */}
        </AccordionDetails>
      </Accordion>
      {/* ---------- Sub Process Setup End --------- */}

    </div>
  );
}

export default ModuleDetails
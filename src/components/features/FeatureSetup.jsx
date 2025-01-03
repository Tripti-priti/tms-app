import React, { useState } from 'react'
import AlertMessage from '../shared/AlertMessage'
import { Button, Card, CardContent, FormControl, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import BorderedTreeView from './TreeFeature'

const FeatureSetup = () => {
  const [featureData,setFeatureData] = useState([]);
  const [expanded, setExpanded] = useState(true);
  const [role, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [moduleData, setModuleData] = useState([]);
  const [processData, setProcessData] = useState([]);
  const [action, setAction] = useState("Create");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [disabled, setDisabled] = useState(false);
  const [roleId, setProjectId] = useState();


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const columns = [
    { field: 'srno', headerName: 'Sr No.', width: 100 },
    { field: 'featurename', headerName: 'Feature Name', width: 150 },
    { field: 'parent', headerName: 'Parent', width: 150 },
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
    <AlertMessage handleClose={handleClose} open={open} message={message} severity={severity} />

    <Card>
      <CardContent >
        <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid2 size={{ xs: 2, sm: 3, md: 3 }} style={{ padding: 0, margin: 0 }}>
            <TextField variant={'outlined'} label={"Feature Name"}
              helperText={""} error={false} size="small"
              autoComplete="off" style={{ width: '96%' }}
              disabled={disabled}
              value={role} onChange={(e) => setProject(e.target.value)} />
          </Grid2>
          <Grid2 size={{ xs: 2, sm: 3, md: 3 }} >
            <FormControl variant={'outlined'} size="small" style={{ width: '98%' }}>
              <InputLabel >Perent</InputLabel>
              <Select disabled={disabled} label="Perent" style={{ width: '98%' }}>
                <MenuItem value=""><em>---Select---</em></MenuItem>
                <MenuItem value={'1001'}>TMS</MenuItem>
                <MenuItem value={'1002'}>EnRep</MenuItem>
                <MenuItem value={'1003'}>Businet</MenuItem>
              </Select>
            </FormControl>
          </Grid2>
         
          <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
            <TextField variant={'outlined'} label={"Description"}
              helperText={""} error={false} size="small"
              autoComplete="off" style={{ width: '96%' }}
              disabled={disabled}
              value={description} onChange={(e) => setDescription(e.target.value)} />
          </Grid2>
          <Grid2 size={{ xs: 2, sm: 2, md: 2 }} style={{ padding: 0, margin: 0 }}>
            <Button variant='outlined' >{action}</Button>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12, md: 12 }} style={{ padding: 0, margin: 0 }}>
            <DataGrid rows={featureData} columns={columns} rowHeight={30}
              slots={{
                toolbar: GridToolbar,
              }}
            />
          </Grid2>
        </Grid2>

        {/* <ProjectList userData={projectData} columns={columns}/> */}
      </CardContent>
    </Card>
    <BorderedTreeView />
  </div>
  )
}

export default FeatureSetup
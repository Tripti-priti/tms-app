import { Create, NoteAdd } from '@mui/icons-material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import { Link } from 'react-router-dom'

const ProjectList = (props) => {
  return (
    <div>
        <DataGrid rows={props.userData} columns={props.columns} rowHeight={30}
     slots={{
      toolbar: GridToolbar,
    }}
     />
    </div>
  )
}

export default ProjectList
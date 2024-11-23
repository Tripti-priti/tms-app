import { Alert, Snackbar } from '@mui/material'
import React from 'react'

const AlertMessage = (props) => {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  return (
    <div>
        <Snackbar 
        anchorOrigin={{ vertical, horizontal }}
        open={props.open} 
        autoHideDuration={6000} 
        onClose={props.handleClose}>
        <Alert
          onClose={props.handleClose}
          
          severity={props.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default AlertMessage 
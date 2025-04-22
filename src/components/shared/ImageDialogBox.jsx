import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ImageDialogBox(props) {
  const [open, setOpen] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (image) => {
    setOpen(true);
    setImageSrc(image);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <span variant="outlined" onClick={()=>{handleClickOpen(props.image)}}>
        {props.buttonName}
      </span>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        
      >
        <DialogTitle id="responsive-dialog-title">
          {"Image Preview"}
        </DialogTitle>
        <DialogContent
       
        >
          <DialogContentText 
          
          >
              <img src={imageSrc} alt={'No Image'} style={{width:'100%',maxHeight:'500px'}} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            CLose
          </Button>
          {/* <Button onClick={()=>{props.handleDelete(id,setOpen)}} autoFocus>
            Delete
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
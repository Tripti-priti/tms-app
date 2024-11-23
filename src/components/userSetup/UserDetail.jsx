import { Alert, Button, Card, CardActions, CardContent, CardMedia, FormControl, FormControlLabel, FormGroup, Input, InputLabel, MenuItem, NativeSelect, Select, Snackbar, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2'
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import axios from "axios";
import AlertMessage from "../shared/AlertMessage";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';

const UserDetail = () => {
    const [variant, setVariant] = useState("standard");
    const [saluation, setSaluation] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [roles, setRoles] = useState([]);
    const [rolesData, setRolesData] = useState([]);
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [active, setActive] = useState(true);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [action, setAction] = useState('Save');
    const [disabled, setDisabled] = useState(true);
    const [userId,setUsetId]=useState("");

    const [image, setImage] = useState("https://mui.com/static/images/cards/contemplative-reptile.jpg");
    const params = useParams();
    
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const onChangeImage = (evt) => {
        
        const file = evt.target.files[0];
        console.log(file);
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            setImage(e.target.result)
            console.log(e.target)
        };
        reader.readAsDataURL(file);
       
    }
        
    }
    useEffect(() => {
        fetchRoles();
        fetchUserDetails();

    }, []);

    const fetchRoles = async () => {

        await axios.get('https://tms-api-ashy.vercel.app/api/role')
            .then((res) => {
                let data = res.data;
                console.log(data)
                setRoles(data);
            }).catch((err) => {
                setSeverity('error')
                setMessage(err.message)
                setOpen(true);
            })
    }
    const fetchUserDetails = async () => {
        params.id ?
            await axios.get('https://tms-api-ashy.vercel.app/api/users/' + params.id)
                .then((res) => {
                    let data = res.data;
                    console.log(data)
                    setAction('Edit')
                    setSaluation(data.saluation)
                    setUsername(data.username);
                    setEmail(data.email);
                    setMobile(data.mobile);
                    let _dob = new Date(data.dob).toISOString().slice(0, 10);
                    setDob(_dob);
                    setPassword(data.password);
                    // setRole(data.role ? data.role : "");
                    setRolesData(data.role ? data.role : []);
                    setActive(data.is_active === 'Y' ? true : false)
                    setUsetId(params.id)
                }).catch((err) => {
                    setSeverity('error')
                    setMessage(err.message)
                    setOpen(true);
                    
                })
                :setDisabled(false)
    }
    const SaveUser = () => {
        debugger
        if (action === 'Save') {
            axios.post('https://tms-api-ashy.vercel.app/api/users', {
                "role": rolesData,
                "comp_id": "67322719306557f042aba5a7",
                "saluation": saluation,
                "username": username,
                "email": email,
                "mobile": mobile,
                "dob": dob,
                "password": password,
                "is_active": active ? "Y" : "N",
                "status": "A"
            })
                .then((res) => {
                    setSeverity('success')
                    setMessage("Record Saved Successfully.")
                    setOpen(true);
                    setDisabled(true);
                    setAction('Edit');
                    console.log(res.data);
                    setUsetId(res.data._id);
                   // resetFields();
                })
                .catch((err) => {
                    setSeverity('error')
                    setMessage(err.message)
                    setOpen(true);
                })
        } else if(action==='Edit'){
            setAction('Update');
            setDisabled(false);
        } else {

            axios.put('https://tms-api-ashy.vercel.app/api/users/' + userId, {
                "role": rolesData,
                "comp_id": "67322719306557f042aba5a7",
                "saluation": saluation,
                "username": username,
                "email": email,
                "mobile": mobile,
                "dob": dob,
                "password": password,
                "is_active": active ? "Y" : "N",
                "status": "A"
            })
                .then(() => {
                    setSeverity('success')
                    setMessage("Record Updated Successfully.")
                    setOpen(true);
                    setAction('Edit');
                    setDisabled(true);
                    //resetFields();
                })
                .catch((err) => {
                    setSeverity('error')
                    setMessage(err.message)
                    setOpen(true);
                })
        }

    }

    const resetFields = () => {
        setSaluation("")
        setUsername("");
        setEmail("");
        setMobile("");
        setDob("");
        setPassword("");
        setDob("");
        setRole("");
        setRolesData([]);
    }


    const AddRoleDetail = () => {
        debugger;
        if(role!==""){
            setRolesData([
                ...rolesData, {
                    role: role
                }
            ]);
            setRole("");
        }

      
        
        // setRoles(roles.filter(v=>v._id!==role))
    }

    const Delete=(roleId)=>{
      
  
     
    setRolesData(rolesData.filter(v => v.role !== roleId));
 
      
    }
    return (
        <>
            <AlertMessage handleClose={handleClose} open={open} message={message} severity={severity} />
            <Card>
                <CardContent>
                    <Button variant="outlined" style={{ margin: '10px' }} onClick={() => SaveUser()}>{action}</Button>
                    <Link to={'/userlist'}><Button variant="outlined" style={{ margin: '10px' }}>Back to list</Button></Link>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid size={{ xs: 2, sm: 4, md: 8 }} >
                                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    <Grid size={{ xs: 2, sm: 4, md: 4 }} >
                                        <FormControl variant={variant} size="small" style={{ width: '98%' }}>
                                            <InputLabel >Salutation</InputLabel>
                                            <Select disabled={disabled} label="Salutation" style={{ width: '98%' }}
                                                value={saluation} onChange={(e) => setSaluation(e.target.value)} >
                                                <MenuItem value=""><em>---Select---</em></MenuItem>
                                                <MenuItem value={'Mr'}>Mr.</MenuItem>
                                                <MenuItem value={'Mis'}>Miss.</MenuItem>
                                                <MenuItem value={'Mrs'}>Mrs.</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                                        <TextField variant={variant} label={"User Name"}
                                            helperText={""} error={false} size="small"
                                            autoComplete="off" style={{ width: '96%' }}
                                            disabled={disabled} 
                                            value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </Grid>
                                    {/* <Grid size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                                        <TextField variant={variant} label={"Role"}
                                            helperText={""} error={false} size="small"
                                            autoComplete="off" style={{ width: '96%' }}
                                            disabled={disabled} 
                                            value={role} onChange={(e) => setRole(e.target.value)} />
                                    </Grid> */}
                                    <Grid size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                                        <TextField variant={variant} label={"Mobile"}
                                            helperText={""} error={false} size="small"
                                            autoComplete="off" style={{ width: '96%' }}
                                            disabled={disabled} 
                                            value={mobile} onChange={(e) => setMobile(e.target.value)} />
                                    </Grid>
                                    <Grid size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                                        <TextField variant={variant} label={"Email"}
                                            helperText={""} error={false} size="small"
                                            autoComplete="off" style={{ width: '96%' }}
                                            disabled={disabled} 
                                            value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </Grid>
                                    <Grid size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                                        <TextField variant={variant} label={"Password"}
                                            helperText={""} error={false} size="small"
                                            autoComplete="off" style={{ width: '96%' }}
                                            type="password" disabled={disabled} 
                                            value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </Grid>
                                    <Grid size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                                        <TextField variant={variant} label={"DOB"}
                                            helperText={""} error={false} size="small" type="date"
                                            autoComplete="off" style={{ width: '96%' }}
                                            slotProps={{
                                                inputLabel: {
                                                    shrink: true,
                                                },
                                            }} disabled={disabled} 
                                            value={dob} onChange={(e) => setDob(e.target.value)} />
                                    </Grid>
                                    <Grid size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                                        <FormGroup>
                                            <FormControlLabel control={<Switch checked={active} disabled={disabled}  onChange={() => setActive(!active)} />} label="Active" />
                                        </FormGroup>
                                       
                                    </Grid>
                                </Grid>
                               
                                <Grid size={{ xs: 12, sm: 12, md: 12 }} >
                                    <Card style={{ border: '1px solid #ced4da', marginTop: '10px' }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" component="div">
                                                Profile
                                            </Typography>
                                            <FormControl variant={variant} size="small" style={{ width: '50%' }}>
                                                <InputLabel >Role</InputLabel>
                                                <Select label="Role" disabled={disabled}  style={{ width: '98%' }}
                                                    value={role} onChange={(e) => { setRole(e.target.value) }} >
                                                    <MenuItem value=""><em>---Select---</em></MenuItem>
                                                    {
                                                        roles.map((item, index) => {
                                                            if(Array.isArray(rolesData)){
                                                                return rolesData.filter(v => v.role === item._id).length>0 ? 
                                                                ""
                                                                :<MenuItem key={index} value={item._id}>{item.name}</MenuItem>;
                                                            }else{
                                                                return <MenuItem key={index} value={item._id}>{item.name}</MenuItem>;
                                                            }
                                                            
                                                        })
                                                    }
                                                </Select>

                                            </FormControl>

                                            <Button variant="contained" disabled={disabled}  onClick={() => AddRoleDetail()}>Add</Button>
                                            {
                                          
                                                
                                                Array.isArray(rolesData)  &&  rolesData.length > 0 &&
                                                 <Table variant="dense" size="small" style={{ marginTop: '20px' }}>
                                                    <TableHead style={{ backgroundColor: "#ced4da" }}>
                                                        <TableRow>
                                                            <TableCell>Sr No.</TableCell>
                                                            <TableCell>Profile</TableCell>
                                                            <TableCell >{disabled ? "" : "Delete"}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            rolesData.map((item, index) => {
                                                                return <TableRow key={index}>
                                                                    <TableCell>{index + 1}</TableCell>
                                                                    <TableCell>{roles.filter(v => v._id == item.role)[0].name}</TableCell>
                                                                    <TableCell>{disabled ? "" :<DeleteIcon onClick={() => Delete(item.role)}/>}</TableCell>
                                                                </TableRow>
                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            }

                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid size={{ xs: 2, sm: 4, md: 4 }} >
                                <Card >
                                    <CardMedia
                                        style={{ borderRadius: '50%', width: '200px', margin: 'auto' }}
                                        component="img"
                                        alt="green iguana"
                                        height="200"
                                        width="200"
                                        image={image}
                                    />
                                    <CardActions>
                                        <TextField type="file" size="small" style={{ width: '100%' }}
                                            onChange={(e) => { onChangeImage(e) }}
                                        />
                                    </CardActions>
                                </Card>
                            </Grid>

                        </Grid>
                    </Box>
                </CardContent>

            </Card>

        </>
    )
}
export default UserDetail;
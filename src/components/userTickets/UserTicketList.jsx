import { Delete, Edit, Title } from '@mui/icons-material'
import { Button, Card, CardContent, Grid2, TextField } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import moment from 'moment/moment';
import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const apiUrl = process.env.REACT_APP_API_URL;

const UserTicketList = () => {
    
  const [role, setProject] = useState("");
  const [description,setDescription]=useState("");
  const [ticketList,setTicketList]=useState([]);
  const fun_status = (status) =>{
    let _status = '';
    if(status==='p'||status==='P'){
      _status='Pending';
    }
    return _status;
  }
  const fun_formateDate = (date) =>{
    let _date = '';
    _date = moment(date).format("DD-MM-YYYY")
    return _date;
  }
    React.useEffect(() => {
      fetchDetails();
     
    }, []);

      const fetchDetails = async () => {
        await axios.get(apiUrl+'/api/ticket').then((res) => {
          console.log(res.data);

          if(res.data){
            let TicketList = res.data.map((item,index)=>{
              return {
                id:item._id,
                srno:index+1,
                ticketNo:item.ticket_no,
                project:item.proj_id.name,
                module:item.module_id.name,
                process:item.process_id.name,
                subProcess:item.sub_process,
                task:item.ticket_desc,
                status:fun_status(item.status),
                createdOn:fun_formateDate(item.report_on),
                createdBy:item.report_by.username,

              }
            });
            setTicketList(TicketList);
          }

        }).catch((error) => {
          console.log(error.message)
        })
      };

  const columns = [
    {field:'srno',headerName:'Sr No',width:70 },
    {field:'ticketNo',headerName:'Ticket No',width:150 
      ,
        renderCell: (params) => (
          <>
          <div style={{display:'flex',justifyContent:'space-around'}}>
            {params.row.ticketNo}
            <Link ><Delete style={{color:'#c31414'}} /></Link>
            <Link ><Edit style={{color:'#494747'}} /></Link>
          </div>
          </>
        )
      },
    {field:'project',headerName:'Project',width:150 },
    {field:'module',headerName:'Module',width:150 },
    {field:'process',headerName:'Process',width:150 },
    {field:'subProcess',headerName:'Sub Process',width:150 },
    {field:'task',headerName:'Task',width:250 },
    {field:'status',headerName:'Status',width:250 },
    {field:'createdOn',headerName:'Created On',width:250 },
    {field:'createdBy',headerName:'Created By',width:250 },
  ]

  return (
    <div>
        <Card>
            <CardContent>
            <Grid2 container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Project Name"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                 
                  value={role} onChange={(e) => setProject(e.target.value)} />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 4 }} style={{ padding: 0, margin: 0 }}>
                <TextField variant={'outlined'} label={"Module"}
                  helperText={""} error={false} size="small"
                  autoComplete="off" style={{ width: '96%' }}
                  
                  value={description} onChange={(e) => setDescription(e.target.value)} />
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 3 }} style={{ padding: 0, margin: 0 }}>
                <Button variant='outlined' >Search</Button>
              </Grid2>
              <Grid2 size={{ xs: 2, sm: 4, md: 1 }} style={{ padding: 0, margin: 0 }}>
                <Link to={'/userTickets/details'}><Button variant='outlined' >Create</Button></Link>
              </Grid2>
            </Grid2>
            </CardContent>
        </Card>
        <Card style={{marginTop:'5px'}}>
            <CardContent>
            <DataGrid rows={ticketList} columns={columns} rowHeight={30}
     slots={{
      toolbar: GridToolbar,
    }}
     />
            </CardContent>
        </Card>
    </div>
  )
}

export default UserTicketList
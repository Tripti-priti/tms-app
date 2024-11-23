import { Box, Button, Card, CardActions, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react';
import UserTable from './UserTable';
import { Link } from 'react-router-dom';



const UserList = () => {
  
  
  return (
    <>
      <Card>
      <CardContent style={{overflowX:'scroll'}}>
        <Card style={{padding:'10px'}}>
            <Link to={'/userdetail'}><Button variant='outlined'>Create New</Button></Link>
        </Card>
        <UserTable />
        </CardContent>
      </Card>
    </>
  )
}

export default UserList